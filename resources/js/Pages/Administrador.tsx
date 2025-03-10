import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ButtonLink from '@/Components/ButtonLink';

export default function Administrador({ auth, hitung, hitungdevice }: PageProps & {hitung : number, hitungdevice : number}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 flex">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Total Application</h5>
                        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Total Application yang dibuat oleh seluruh pengguna adalah <br/>{ hitung}</p>
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                            <ButtonLink href={route('application')} active={route().current('application')} className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                    viewBox="0 0 32 32" xml:space="preserve">
                                        <path d="M27,4H5C3.3,4,2,5.3,2,7v18c0,1.7,1.3,3,3,3h10.4c-0.9-1.5-1.4-3.2-1.4-5c0-5.5,4.5-10,10-10c2.3,0,4.3,0.8,6,2V7
                                    C30,5.3,28.7,4,27,4z M7.9,8.4C7.9,8.5,7.8,8.6,7.7,8.7C7.5,8.9,7.3,9,7,9S6.5,8.9,6.3,8.7C6.1,8.5,6,8.3,6,8c0-0.3,0.1-0.5,0.3-0.7
                                    c0,0,0.1-0.1,0.1-0.1c0.1,0,0.1-0.1,0.2-0.1C6.7,7,6.7,7,6.8,7c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1
                                    c0,0,0.1,0.1,0.1,0.1c0.1,0.1,0.2,0.2,0.2,0.3C8,7.7,8,7.9,8,8C8,8.1,8,8.3,7.9,8.4z M10.7,8.7C10.5,8.9,10.3,9,10,9
                                    C9.7,9,9.5,8.9,9.3,8.7C9.1,8.5,9,8.3,9,8c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2
                                    C10,6.9,10.4,7,10.7,7.3c0.1,0.1,0.2,0.2,0.2,0.3C11,7.7,11,7.9,11,8C11,8.3,10.9,8.5,10.7,8.7z M13.9,8.4c-0.1,0.1-0.1,0.2-0.2,0.3
                                    C13.5,8.9,13.3,9,13,9c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3C12,8.3,12,8.1,12,8
                                    c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.4,1-0.4,1.4,0c0.1,0.1,0.2,0.2,0.2,0.3C14,7.7,14,7.9,14,8
                                    C14,8.1,14,8.3,13.9,8.4z"/>
                                <path d="M24,15c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,15,24,15z M27,24h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1
                                    S27.6,24,27,24z"/></svg>
                                <div className="text-left rtl:text-right">
                                    <div className="-mt-1 font-sans text-sm font-semibold">See More Details</div>
                                </div>
                            </ButtonLink>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Total Api Key</h5>
                            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Total Api Keys yang dibuat oleh seluruh pengguna adalah <br/> { hitungdevice}</p>
                            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                                <ButtonLink href={route('application')} active={route().current('application')} className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 32 32" xml:space="preserve">

                                <path d="M27,4H5C3.3,4,2,5.3,2,7v18c0,1.7,1.3,3,3,3h10.4c-0.9-1.5-1.4-3.2-1.4-5c0-5.5,4.5-10,10-10c2.3,0,4.3,0.8,6,2V7
	C30,5.3,28.7,4,27,4z M7.9,8.4C7.9,8.5,7.8,8.6,7.7,8.7C7.5,8.9,7.3,9,7,9S6.5,8.9,6.3,8.7C6.1,8.5,6,8.3,6,8c0-0.3,0.1-0.5,0.3-0.7
	c0,0,0.1-0.1,0.1-0.1c0.1,0,0.1-0.1,0.2-0.1C6.7,7,6.7,7,6.8,7c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1
	c0,0,0.1,0.1,0.1,0.1c0.1,0.1,0.2,0.2,0.2,0.3C8,7.7,8,7.9,8,8C8,8.1,8,8.3,7.9,8.4z M10.7,8.7C10.5,8.9,10.3,9,10,9
	C9.7,9,9.5,8.9,9.3,8.7C9.1,8.5,9,8.3,9,8c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2
	C10,6.9,10.4,7,10.7,7.3c0.1,0.1,0.2,0.2,0.2,0.3C11,7.7,11,7.9,11,8C11,8.3,10.9,8.5,10.7,8.7z M13.9,8.4c-0.1,0.1-0.1,0.2-0.2,0.3
	C13.5,8.9,13.3,9,13,9c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3C12,8.3,12,8.1,12,8
	c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.4,1-0.4,1.4,0c0.1,0.1,0.2,0.2,0.2,0.3C14,7.7,14,7.9,14,8
	C14,8.1,14,8.3,13.9,8.4z"/>
<path d="M24,15c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S28.4,15,24,15z M27,24h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1
	S27.6,24,27,24z"/>

                                    </svg>
                                    <div className="text-left rtl:text-right">
                                        <div className="-mt-1 font-sans text-sm font-semibold">See More Details</div>
                                    </div>
                                </ButtonLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
