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
    return (
      <div className="text-gray-700 font-semibold text-lg">

        <h2 className="text-2xl mb-4">{activePage}</h2>
        <p>محتوى {activePage} سيظهر هنا.</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen">

      <div
        className={classNames(
          "bg-white shadow-md w-64 fixed md:static md:translate-x-0 z-30 transition-transform duration-200 ease-in-out h-full",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
          }
        )}
      >
        <div className="p-4 border-b text-xl font-bold text-blue-600">
          لوحة الأدمن
        </div>
        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li
              key={item}
              className={classNames(
                "p-2 rounded cursor-pointer hover:bg-blue-100",
                {
                  "bg-blue-500 text-white": activePage === item,
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


      <div className="flex-1 flex flex-col ml-0 md:ml-64">

        <div className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-bold text-blue-600">لوحة الأدمن</span>
        </div>

        <div className="p-6 bg-gray-50 flex-1 overflow-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;