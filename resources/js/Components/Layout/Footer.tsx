import React from "react";
const Footer = () => {
  return (
    <div className="bg-white-300 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          <p className="mb-4">
            <strong className="font-medium">OmahIOT API</strong> adalah platform API yang kuat dan fleksibel, dirancang untuk mempermudah integrasi perangkat IoT dengan berbagai aplikasi. 
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
            </div>
          </div>
          <p className="text-gray-400">©{new Date().getFullYear()} - OmahIOT</p>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Produk</p>
          <ul className="text-black-500 ">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Unduh{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Harga{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Lokasi{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Server{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Negara{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Blog{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Engage</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Apa itu OmahIOT?{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              FAQ{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tutorial{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tentang Kami{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Kebijakan Privasi{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Syarat Layanan{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Menghasilkan Uang</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Afiliasi{" "}
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Menjadi Mitra{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
