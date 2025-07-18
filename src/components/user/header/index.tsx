import { cn } from "@/lib/utils";
import Account from "./components/Account";
import Cart from "./components/Cart";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import VerticalDropdown from "./components/VerticalDropDown";
import { GiHamburgerMenu } from "react-icons/gi";
import Container from "@/components/ui/Container";
import React from "react";
import { debounce } from "@/utils/debounce";
import { IoSearchSharp } from "react-icons/io5";
const menuItems = [
  {
    title: "Sản phẩm",
    submenu: [
      "Bộ sưu tập",
      "Phòng ngủ",
      "Phòng khách",
      "Phòng ăn",
      "Phòng làm việc",
    ],
  },
  { title: "Khuyến mãi", submenu: ["Khuyến mãi hè", "Mã khuyến mãi"] },
  { title: "Tin tức", submenu: ["Bài viết", "Mọi người", "Mạng xã hội"] },
  { title: "Liên hệ hợp tác", submenu: [] },
  { title: "Về ZORO", submenu: [] },
  { title: "Cửa hàng", submenu: [] },
];

interface HeaderProps {
  className?: string;
  onHandleResize: (value: number) => void;
}
export default function Header({ className, onHandleResize }: HeaderProps) {
  const headerRef = React.useRef<HTMLDivElement>(null);
  const handleResizeRef = React.useRef<() => void>(()=>{});
  React.useEffect(() => {
    handleResizeRef.current = debounce(() => {
      if (headerRef.current) {
        onHandleResize(headerRef.current.offsetHeight);
      }
    }, 300);
    handleResizeRef.current();
    window.addEventListener("resize", handleResizeRef.current);
    return () => {
      window.removeEventListener("resize", handleResizeRef.current!);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full bg-white z-10 shadow-lg",
        className
      )}
    >
      <Container className="flex flex-col gap-4">
        <div
          className={cn(
            "flex flex-row flex-wrap justify-between items-center gap-4",
            "sm:flex-nowrap"
          )}
        >
          <div
            className={cn("flex flex-row gap-2 items-center cursor-pointer")}
          >
            <GiHamburgerMenu className={cn("size-8", "sm:hidden")} />
            <Logo className="text-[20px]" />
          </div>
          <div className={cn("flex flex-row items-center gap-4")}>
          <SearchInput className={cn(" hidden", "sm:block")} />
          <IoSearchSharp className="size-7 sm:hidden hover:text-cyan-500"/>
          
          
            {/* <Store /> */}
            <Account />
            <Cart />
          </div>
        </div>
        <nav className={cn(" hidden", "sm:flex flex-row gap-2")}>
          <VerticalDropdown menuItems={menuItems} />
        </nav>
      </Container>
    </header>
  );
}
