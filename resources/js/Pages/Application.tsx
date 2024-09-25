import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import Modal from "@/Components/Modal";
import { FormEventHandler, useRef, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import ButtonLink from "@/Components/ButtonLink";

export default function Application({ auth, hitung, apps = [] }: PageProps & {hitung: number, apps: Array<{kode_aplikasi: string, nama_aplikasi: string, deskripsi: string}>}) {
    const [createApplication, setCreateAppication] = useState(false);
    const aplikasiInput = useRef<HTMLInputElement>(null);
    const deskripsiInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm ({
        nama_aplikasi : '',
        deskripsi : '',
    });

    const createApp = () => {
        setCreateAppication(true);
    };

    const creatingApp: FormEventHandler = (e) => {
        e.preventDefault();

        post(('/postApp'), {
            preserveScroll: true,
            onSuccess: () => closeModal,
            onError: () => aplikasiInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setCreateAppication(false);
        reset();
    };
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Application</h2>}
        >
            <Head title="Application" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto mb-5 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex justify-between">
                        <div></div>
                        <a href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                            <div className="text-left rtl:text-right">
                                <div className="-mt-1 font-sans text-sm font-semibold" onClick={createApp}>Create Application</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mb-5 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {apps.map((app, index) => (
                            <div key={index} className="p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{app.nama_aplikasi}</h5>
                                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{app.deskripsi}</p>
                                <ButtonLink
                                    href={route('apikey', { kode: app.kode_aplikasi })} active={route().current('apikey')}
                                    className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg px-4 py-2.5" active={false} >
                                    See More Details
                                </ButtonLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={createApplication} onClose={closeModal}>
                <form onSubmit={creatingApp} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create Application
                    </h2>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <div className="mt-6">
                        <InputLabel htmlFor="nama_aplikasi" value="Nama Aplikasi" className="sr-only" /> Nama Aplikasi

                        <TextInput
                            id="nama_aplikasi"
                            type="text"
                            ref={aplikasiInput}
                            name="nama_aplikasi"
                            className="mt-4 mb-4 block w-full"
                            isFocused
                            placeholder="Nama Aplikasi"
                            onChange={(e) => setData('nama_aplikasi', e.target.value)}
                        />

                        <InputError message={errors.nama_aplikasi} className="mt-2" />

                        <InputLabel htmlFor="deskripsi" value="Deskripsi" className="sr-only " /> Deskripsi
                        <TextInput
                            id="deskripsi"
                            type="text"
                            ref={deskripsiInput}
                            name="deskripsi"
                            className="mt-4 mb-4 block w-full"
                            isFocused
                            placeholder="Deskripsi"
                            onChange={(e) => setData('deskripsi', e.target.value)}
                        />

                        <InputError message={errors.deskripsi} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <SuccessButton className="ms-3" disabled={processing}>
                            SUBMIT
                        </SuccessButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}