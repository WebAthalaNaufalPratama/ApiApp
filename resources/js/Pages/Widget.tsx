import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import Modal from "@/Components/Modal";
import { FormEventHandler, useRef, useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import RadioButton from "@/Components/RadioButton";
import SelectOption from "@/Components/SelectOption";
import Swal from 'sweetalert2';
import GaugeMeter from "@/Components/GaugeMeter";
import ButtonLink from "@/Components/ButtonLink";

export default function Widget({ auth, kode, apps, aplikasi = [], device = [], value = [], nilai = [] }: PageProps & { kode: string, apps: string, aplikasi: Array<{id:number, nama_aplikasi: string}>, device: Array<{id:number, par_nama_device: string}>, value: Array<{id:number, kode_chart:string, chart_id: number, min: number, max:number, nama_device: string}>, nilai: Array<{nilai:number, tanggal:date, waktu:time}> }) {
    const [createApplication, setCreateApplication] = useState(false);
    const aplikasiInput = useRef<HTMLSelectElement>(null);
    const [startDate, setStartDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        charts: '',
        min: '',
        max: '',
        aplikasi: '',
        device: '',
        value: '',
    });

    const [filteredDevices, setFilteredDevices] = useState<Array<{id:number, par_nama_device: string}>>([]);
    const [filteredValues, setFilteredValues] = useState<Array<{id:number, nama_device: string}>>([]);
    const [rangeError, setRangeError] = useState<string | null>(null);

    const gaugeData = value
        .filter((val) => val.chart_id === 1)
        .map((val, index) => {
            const min = val.min > 0 ? val.min : 0;
            const max = val.max > 0 ? val.max : 100;
            const gaugeValue = nilai[index]?.nilai > 0 ? nilai[index].nilai : 50;
            const date = new Date(nilai[index].tanggal).toISOString(); 
            return { min, max, gaugeValue, date }; 
        });

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = e.target.value;
        setData('min', minValue);

        if (parseFloat(minValue) > parseFloat(data.max || "0")) {
            setRangeError("Min range cannot be greater than max range.");
        } else {
            setRangeError(null);
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxValue = e.target.value;
        setData('max', maxValue);

        if (parseFloat(maxValue) < parseFloat(data.min || "0")) {
            setRangeError("Max range cannot be less than min range.");
        } else {
            setRangeError(null);
        }
    };

    const handleAplikasiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedAplikasiId = e.target.value;
        setData('aplikasi', selectedAplikasiId);

        const filteredDevices = device.filter(dev => dev.aplikasi_id === parseInt(selectedAplikasiId));
        setFilteredDevices(filteredDevices);

        const filteredValues = value.filter(val => filteredDevices.some(dev => dev.id === val.parentdevice_id));
        setFilteredValues(filteredValues);
    };

    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDeviceId = e.target.value;
        setData('device', selectedDeviceId);
    
        const filteredValues = value.filter(val => val.parentdevice_id === parseInt(selectedDeviceId));
        setFilteredValues(filteredValues);
    };
    
    const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('value', e.target.value);
    };
    
    const createApp = () => {
        setCreateApplication(true);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleFilter = () => {
        if (startDate) {
            const filtered = gaugeData.filter((gauge) => {
                const gaugeDate = new Date(gauge.date); // pastikan date valid
                return gaugeDate >= new Date(startDate);
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(gaugeData); // Jika tidak ada filter, tampilkan semua data
        }

        console.log('Filtering with start date:', startDate);
    };

    console.log(nilai);

    useEffect(() => {
        setFilteredData(gaugeData); // Inisialisasi filteredData dengan gaugeData
    }, []); // Hanya dijalankan sekali saat komponen dimount
    

    const creatingApp: FormEventHandler = (e) => {
        e.preventDefault();
    
        if (rangeError) {
            return;
        }
    
        router.post(route('postWidget.store'), data, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                Swal.fire({
                    title: 'Success!',
                    text: 'The form has been submitted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            },
            onError: () => aplikasiInput.current?.focus(),
            onFinish: () => reset(),
        });
    };
    
    const closeModal = () => {
        setCreateApplication(false);
        reset();
    };

    const chartsWithChartId1 = value.filter(val => val.chart_id === 1);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Widget</h2>}
        >
            <Head title="Application" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto mb-5 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 overflow-hidden shadow-sm sm:rounded-lg flex justify-between">
                        <div></div>
                        <a href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5" onClick={createApp}>
                            <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                            <div className="text-left rtl:text-right">
                                <div className="-mt-1 font-sans text-sm font-semibold">Create Widget</div>
                            </div>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {filteredData.map((gauge, index) => (
                            <div key={index} className="bg-gray-50 p-4 shadow-md rounded-lg">
                                {/* Date Range Picker */}
                                <div className="flex items-center justify-around">
                                    <input 
                                        id="datepicker-range-start" 
                                        name="start" 
                                        type="date" 
                                        value={startDate} 
                                        onChange={handleStartDateChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                                        placeholder="Select start date"
                                    />

                                    {/* Button to Apply Filter */}
                                    <button 
                                        onClick={handleFilter} 
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                                    >
                                        Apply Filter
                                    </button>
                                </div>

                                {/* Gauge Meter */}
                                <h4 className="text-sm font-medium text-gray-800 mt-4">Gauge Meter {index + 1}</h4>
                                <GaugeMeter min={gauge.min} max={gauge.max} value={gauge.gaugeValue} />
                            </div>
                        ))}
                    </div>

                </div>

                
            </div>

            <Modal show={createApplication} onClose={closeModal}>
                <form onSubmit={creatingApp} className="p-6 max-h-[80vh] overflow-y-auto">
                    <h2 className="text-lg font-medium text-gray-900">Create Application</h2>
                    <hr className="mt-2" />
                    <div className="mt-6">
                        <h1 className="text-sm font-medium text-gray-900 mb-2">CHART</h1>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">(Pilih Salah Satu Chart)</h3>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center rounded">
                                <RadioButton
                                    id="slider-range"
                                    name="charts"
                                    value="1"
                                    onChange={(e) => setData('charts', e.target.value)}
                                />
                                <label htmlFor="slider-range" className="ml-2 text-sm text-gray-600">Gauge Meter</label>
                            </div>
                        </div>

                        <div className="flex items-center mb-4 justify-evenly">
                            <InputLabel htmlFor="min" value="Min Range" className="sr-only" />
                            Min Range
                            <TextInput
                                id="min"
                                type="number"
                                name="min"
                                className="mt-4 mb-4 block w-30 flex"
                                placeholder="Min Range"
                                onChange={handleMinChange}
                            />
                            {rangeError && <p className="text-red-600 text-sm">{rangeError}</p>}

                            <InputLabel htmlFor="max" value="Max Range" className="sr-only" />
                            Max Range
                            <TextInput
                                id="max"
                                type="number"
                                name="max"
                                className="mt-4 mb-4 block w-30 flex"
                                placeholder="Max Range"
                                onChange={handleMaxChange}
                            />
                            {rangeError && <p className="text-red-600 text-sm">{rangeError}</p>}
                        </div>

                        <div className="flex items-center mb-4 justify-evenly">
                            <InputLabel htmlFor="aplikasi" value="Aplikasi" />
                            <SelectOption
                                id="aplikasi"
                                onChange={handleAplikasiChange}
                            >
                                <option value="" disabled>Pilih Aplikasi</option>
                                {aplikasi.map((app) => (
                                    <option key={app.id} value={app.id} ref={aplikasiInput}>{app.nama_aplikasi}</option>
                                ))}
                            </SelectOption>

                            <InputLabel htmlFor="device" value="Device" />
                            <SelectOption
                                id="device"
                                onChange={handleDeviceChange}
                            >
                                <option value="" disabled>Pilih Device</option>
                                {filteredDevices.map((dev) => (
                                    <option key={dev.id} value={dev.id}>{dev.par_nama_device}</option>
                                ))}
                            </SelectOption>

                            <InputLabel htmlFor="value" value="Value" />
                            <SelectOption id="value" value={data.value} onChange={handleValueChange}>
                                <option value="" disabled>Pilih Value</option>
                                {filteredValues.map((val) => (
                                    <option key={val.id} value={val.id}>{val.nama_device}</option>
                                ))}
                            </SelectOption>
                        </div>
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
