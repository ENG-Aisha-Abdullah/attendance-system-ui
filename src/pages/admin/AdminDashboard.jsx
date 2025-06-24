import { useState } from "react";
import { Menu, X } from "lucide-react";
import classNames from "classnames";

const menuItems = [
  "Dashboard",
  "إدارة الطلاب",
  "إدارة المعلمين",
  "إدارة المرشدين",
  "إدارة الصفوف",
  "تعيين طلاب",
  "تعيين معلمين",
  "تعيين مرشد",
  "الأعذار",
  "التقارير",
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    if (activePage === "Dashboard") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#5196ac]">
            <h3 className="text-xl font-semibold text-[#5196ac] mb-2">الطلاب</h3>
            <p className="text-3xl font-bold text-gray-700">120</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#5196ac]">
            <h3 className="text-xl font-semibold text-[#5196ac] mb-2">المعلمين</h3>
            <p className="text-3xl font-bold text-gray-700">25</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#5196ac]">
            <h3 className="text-xl font-semibold text-[#5196ac] mb-2">الأعذار</h3>
            <p className="text-3xl font-bold text-gray-700">17</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#5196ac]">
            <h3 className="text-xl font-semibold text-[#5196ac] mb-2">الغيابات</h3>
            <p className="text-3xl font-bold text-gray-700">43</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="flex justify-center items-center h-full max-w-2xl">
        <div className="text-gray-800 font-medium text-lg w-full max-w-3xl">
          <h2 className="text-3xl text-center font-bold mb-4 text-[#5196ac]">
            {activePage}
          </h2>
          <div className="p-4 rounded-xl shadow-md bg-zinc-50">
            <p className="text-gray-600 text-center">محتوى {activePage}.</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={classNames(
          "bg-[#27465b] shadow-lg w-64 fixed md:static md:translate-x-0 z-30 transition-transform duration-200 ease-in-out h-full",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
          }
        )}
      >
        <div className="p-6 border-b text-center text-2xl font-bold text-white ">
          لوحة التحكم
        </div>
        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li
              key={item}
              className={classNames(
                "p-3 rounded-lg cursor-pointer transition-colors duration-200",
                {
                  "bg-[#5196ac] text-white shadow-md": activePage === item,
                  "text-white hover:bg-[#5196AC] hover:opacity-80":
                    activePage !== item,
                }
              )}
              onClick={() => {
                setActivePage(item);
                setSidebarOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col ml-0 overflow-auto">
        <div className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-[#5196ac]">لوحة الأدمن</span>{" "}
        </div>

        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
