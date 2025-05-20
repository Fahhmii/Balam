"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { AdminNav } from "@/components/nav/admin-nav"
import { EmployeeNav } from "@/components/nav/employee-nav"

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname()
  const isAdmin = pathname.includes("/admin")
  const isResizing = useRef(false)
  const sidebarRef = useRef(null)
  const navRef = useRef(null)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (open && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [open, setOpen])

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }, [pathname, setOpen])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // On desktop, we can keep the sidebar open
        setOpen(false) // Close the mobile sheet
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [setOpen])

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-[280px] sm:w-[320px]">
          <div ref={sidebarRef} className="flex flex-col h-full">
            <div className="flex h-16 items-center border-b px-6">
              <Link
                href={isAdmin ? "/admin/dashboard" : "/karyawan/dashboard"}
                className="flex items-center gap-2 font-semibold"
              >
                <span className="font-bold text-xl">HRMS</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 md:hidden"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1 py-2">{isAdmin ? <AdminNav /> : <EmployeeNav />}</ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside ref={navRef} className={cn("fixed hidden h-screen w-64 flex-col border-r bg-background md:flex z-30")}>
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href={isAdmin ? "/admin/dashboard" : "/karyawan/dashboard"}
            className="flex items-center gap-2 font-semibold"
          >
            <span className="font-bold text-xl">HRMS</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">{isAdmin ? <AdminNav /> : <EmployeeNav />}</ScrollArea>
      </aside>
    </>
  )
}
