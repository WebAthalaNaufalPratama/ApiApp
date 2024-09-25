import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import Modal from "@/Components/Modal";
import { FormEventHandler, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useRef, useState, } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import ButtonLink from "@/Components/ButtonLink";
import Checkbox from "@/Components/Checkbox";
import SelectOption from "@/Components/SelectOption";

export default function ApiKey({ auth, kode, apps, pardevice, device }: PageProps & { kode: string, apps: Array<{ id: number, kode_aplikasi: string }>, pardevice: Array<{ id: number, kode_api: string }>, device: Array<{ id: number, methods: string, nama_device: string }> }) {
    const [createApplication, setCreateApplication] = useState(false);
    const [deviceCount, setDeviceCount] = useState(1);
    const [valueCount, setValueCount] = useState<number[]>([]);
    const aplikasiInput = useRef<HTMLInputElement>(null);
    const jumlahDeviceInput = useRef<HTMLInputElement>(null);
    const deskripsiInput = useRef<HTMLInputElement>(null);
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};
    const [showApiDetails, setShowApiDetails] = useState(false);
    const [apiDetails, setApiDetails] = useState({ endpoint: '', params: '' });
    const apiDetailsRef = useRef<HTMLTextAreaElement>(null);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        methods: '',
        // jumlah_device: '',
        // par_nama_device: '',
        // jumlahdevice: '',
        // nama_device: '',
        // typevalue: '',
    });

    const createApp = () => {
        setCreateApplication(true);
    };

    const creatingApp: FormEventHandler = (e) => {
        e.preventDefault();
  
        router.post(route('postDevice.store', { id: kode }), data, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => aplikasiInput.current?.focus(),
            onFinish: () => reset(),
        });
    };
    
    const closeModal = () => {
        setCreateApplication(false);
        reset();
    };

    const filterDevicesByMethod = (method: string, parentId: number) => {
        return device.filter(dev => dev.parentdevice_id === parentId && dev.methods.includes(method));
    };

    const showApiDetailsModal = (endpoint: string, params: string) => {
        setApiDetails({ endpoint, params });
        setShowApiDetails(true);
    };
    
    // Function to copy API details to clipboard
    const copyToClipboard = () => {
        if (apiDetailsRef.current) {
            apiDetailsRef.current.select();
            document.execCommand('copy');
            alert('API details copied to clipboard!');
        }
    };


    const groupDevicesByAppAndParent = (devices: any[], apps: any[], pardevice: any[]) => {
        const grouped = {};

        devices.forEach((dev: { aplikasi_id: any; parentdevice_id: any; methods: string; nama_device: any; }) => {
            // Find corresponding app and parent device
            const app = apps.find((a: { id: any; }) => a.id === dev.aplikasi_id);
            const parent = pardevice.find((p: { id: any; }) => p.id === dev.parentdevice_id);
            
            if (app && parent) {
                const key = `${app.kode_aplikasi}/${parent.kode_api}`;

                if (!grouped[key]) {
                    grouped[key] = {
                        app,
                        parent,
                        methods: {
                            GET: [],
                            POST: [],
                            PATCH: []
                        }
                    };
                }

                // Handle multiple methods in a single string
                const methods = dev.methods.split(',').map((m: string) => m.trim());

                methods.forEach((method: string | number) => {
                    if (grouped[key].methods[method] !== undefined) {
                        const methodDevices = grouped[key].methods[method];
                        const existingDevice = methodDevices.find((d: { nama_device: any; }) => d.nama_device === dev.nama_device);

                        if (!existingDevice) {
                            methodDevices.push({ ...dev, nama_device: [dev.nama_device] });
                        } else {
                            existingDevice.nama_device = [...new Set([...existingDevice.nama_device, dev.nama_device])];
                        }
                    }
                });
            }
        });

        return grouped;
    };

    const groupedDevices = groupDevicesByAppAndParent(device, apps, pardevice);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Application Programming Interface</h2>}
        >
            <Head title="Application" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto mb-5 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex justify-between mb-5">
                        <div></div>
                        <a href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                            <div className="text-left rtl:text-right">
                                <div className="-mt-1 font-sans text-sm font-semibold" onClick={createApp}>Create Api Key</div>
                            </div>
                        </a>
                    </div>
                    {Object.values(groupedDevices).map(({ app, parent, methods }) => (
                        <div key={`${app.id}-${parent.id}`} className="bg-white p-6 shadow-lg sm:rounded-lg mb-8">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Endpoint: http://127.0.0.1/{app.kode_aplikasi}/{parent.kode_api}
                            </h3>
                            <div className="mt-6">
                                <div className="flex flex-wrap space-x-4">
                                    {Object.entries(methods).map(([method, devices]) => (
                                        <div key={method} className="flex-1 bg-gray-100 p-4 rounded-lg shadow-sm">
                                            <h5 className="text-lg font-bold text-gray-700">{method}</h5>
                                            <div className="mt-4 space-y-4">
                                                {devices.map((dev: { id: Key | null | undefined; nama_device: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                                                    <div key={dev.id} className="bg-white p-4 rounded-lg shadow-sm">
                                                        <div className="text-gray-900 font-medium">
                                                            <p>{dev.nama_device}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Only show the button if there are devices for the method */}
                                            {devices.length > 0 && (
                                                <button
                                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                                    onClick={() => showApiDetailsModal(
                                                        `http://127.0.0.1/${app.kode_aplikasi}/${parent.kode_api}`,
                                                        `{\n    ${devices.map((d: { type: string; nama_device: any; }) => {
                                                            let value;
                                                            if (d.type === 'int') {
                                                                value = '"10"';
                                                            } else if (d.type === 'decimal') {
                                                                value = '"1,2"';
                                                            } else if (d.type === 'string') {
                                                                value = '"Nama Value"';
                                                            } else if (d.type === 'float') {
                                                                value = '"0.3000"';
                                                            }else {
                                                                value = '"default"'; // Default value for any other type
                                                            }
                                                            return `"${d.nama_device}" : ${value}`;
                                                        }).join(',\n    ')}\n}`
                                                    )}
                                                >
                                                    Show API Details
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={showApiDetails} onClose={() => setShowApiDetails(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">API Details</h2>
                    <textarea
                        ref={apiDetailsRef}
                        className="mt-4 p-2 w-full h-32 border rounded-lg"
                        readOnly
                        value={`Endpoint: ${apiDetails.endpoint}\n\n${apiDetails.params}`}
                    />
                    <div className="mt-4 flex justify-between">
                        <SecondaryButton onClick={() => setShowApiDetails(false)}>Close</SecondaryButton>
                        <SuccessButton onClick={copyToClipboard}>Copy</SuccessButton>
                    </div>
                </div>
            </Modal>


            <Modal show={createApplication} onClose={closeModal}>
                <form onSubmit={creatingApp} className="p-6 max-h-[80vh] overflow-y-auto">
                    <h2 className="text-lg font-medium text-gray-900">Create Application</h2>
                    <hr className="mt-2"/>
                    <div className="mt-6">

                        <h1 className="text-sm font-medium text-gray-900 mb-2">METHOD</h1>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">(Pilih Minimal Satu Method)</h3>
                        
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center rounded">
                            <Checkbox
                                id="method_get"
                                name="methods"
                                value="GET"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData('methods', [...(data.methods || []), 'GET']);
                                    } else {
                                        setData('methods', data.methods.filter((method: string) => method !== 'GET'));
                                    }
                                }}
                            />
                            <label htmlFor="method_get" className="ml-2 text-sm text-gray-600">GET</label>
                            </div>

                            <div className="flex items-center rounded">
                            <Checkbox
                                id="method_post"
                                name="methods"
                                value="POST"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData('methods', [...(data.methods || []), 'POST']);
                                    } else {
                                        setData('methods', data.methods.filter((method: string) => method !== 'POST'));
                                    }
                                }}
                            />
                            <label htmlFor="method_post" className="ml-2 text-sm text-gray-600">POST</label>
                            </div>

                            <div className="flex items-center rounded">
                            <Checkbox
                                id="method_patch"
                                name="methods"
                                value="PATCH"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setData('methods', [...(data.methods || []), 'PATCH']);
                                    } else {
                                        setData('methods', data.methods.filter((method: string) => method !== 'PATCH')); 
                                    }
                                }}
                            />
                            <label htmlFor="method_patch" className="ml-2 text-sm text-gray-600">PATCH</label>
                            </div>
                        </div>

                        <InputError message={errors.methods} className="mt-2" />

                        <InputLabel htmlFor="jumlah_device" value="Jumlah Device" className="sr-only" />
                        JUMLAH DEVICE

                        <TextInput
                            id="jumlah_device"
                            type="number"
                            name="jumlah_device"
                            className="mt-4 mb-4 block w-full"
                            isFocused
                            placeholder="Jumlah Device"
                            min="1"
                            max="5"
                            onChange={(e) => {
                                const value = Math.min(parseInt(e.target.value, 10) || 1, 5);
                                setData('jumlah_device', value);
                                setDeviceCount(value);
                                setValueCount(Array(value).fill(1));
                            }}
                        />

                        <InputError message={errors.jumlah_device} className="mt-2" />

                        {Array.from({ length: deviceCount }, (_, index) => (
                            <div key={index} className="mt-4">
                                <InputLabel htmlFor={`par_nama_device_${index}`} value={`Nama Device ${index + 1}`} className="sr-only" />
                                NAMA DEVICE {index + 1}
                                
                                <TextInput
                                    id={`par_nama_device_${index}`}
                                    type="text"
                                    name={`par_nama_device_${index}`}
                                    className="mt-2 mb-4 block w-full"
                                    placeholder={`Nama Device ${index + 1}`}
                                    onChange={(e) => setData(`par_nama_device_${index}`, e.target.value)}
                                />

                                <InputError message={errors[`par_nama_device_${index}`]} className="mt-2" />

                                {/* Adjust Jumlah Value with + and - */}
                                <div className="flex items-center mb-4 justify-evenly">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setValueCount(prevCounts => {
                                                const newCounts = [...prevCounts];
                                                if (newCounts[index] > 1) {
                                                    newCounts[index] -= 1;
                                                }
                                                setData(`jumlah_value_${index}`, newCounts[index]);
                                                return newCounts;
                                            });
                                        }}
                                        className="px-2 py-1 border rounded text-gray-600 bg-gray-200 hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="mx-4 text-lg text-gray-800">{valueCount[index] || 0}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setValueCount(prevCounts => {
                                                const newCounts = [...prevCounts];
                                                if (newCounts[index] < 5) {
                                                    newCounts[index] += 1;
                                                }
                                                setData(`jumlah_value_${valueCount[index]}`, newCounts[index]);
                                                console.log(valueCount[index]);
                                                return newCounts;
                                            });
                                        }}
                                        className="px-2 py-1 border rounded text-gray-600 bg-gray-200 hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Dynamic Nama Value Inputs */}
                                {Array.from({ length: valueCount[index] || 0 }, (_, valueIndex) => (
                                    <div key={valueIndex} className="mt-2 flex items-center justify-evenly">
                                        <InputLabel htmlFor={`value_${index}_${valueIndex}`} value={`Value ${valueIndex + 1}`} className="sr-only" />
                                        Value {valueIndex + 1} <br />
                                        
                                        <TextInput
                                            id={`value_${index}_${valueIndex}`}
                                            type="text"
                                            name={`value_${index}_${valueIndex}`}
                                            className="mt-2 mb-2 block w-50"
                                            placeholder={`Nama Value ${valueIndex + 1}`}
                                            onChange={(e) => setData(`value_${index}_${valueIndex}`, e.target.value)}
                                        />

                                        <InputError message={errors[`value_${index}_${valueIndex}`]} className="mt-2" />

                                        <div className="max-w-md">
                                        <SelectOption
                                            onChange={(e) => setData(`typevalue_${index}_${valueIndex}`, e.target.value)} 
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Pilih Opsi Type</option>
                                            <option value="int">Integer</option>
                                            <option value="string">String</option>
                                            <option value="float">Float</option>
                                            <option value="decimal">Decimal</option>
                                        </SelectOption>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
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
