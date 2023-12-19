import { useContext, useEffect, useState } from 'react';
import '../styling/homepage.css'
import { FaStar } from "react-icons/fa";
import { useMyContext } from '../context/useContext';
import { Modal, DatePicker, TimePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useForm } from 'antd/es/form/Form';

const HomePage = () => {
    const [form] = useForm();
    const { myIkimasState, setMyPasswordState, myPasswordState } = useMyContext();
    const [counter, setCounter] = useState("- - : - - : - - : - -");
    const [isCounterVisible, setIsCounterVisible] = useState(false);
    const [inputValue, setInputValue] = useState('ENTER THE PASSWORD..');
    const [tagetTime, setTargetTime] = useState({
        year: 0,
        month: 0,
        day: 0,
        hours: 0,
        minutes: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFocus = () => {
        setInputValue(''); // Clear the input value on focus
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value === myIkimasState) {
                setIsModalOpen(true)
            }
            console.log(myPasswordState);
            if (e.target.value === myPasswordState) {
                setIsCounterVisible(true);
            }
            console.log('Enter key pressed', e);
        }
    };

    useEffect(() => {
        const targetDate = new Date(tagetTime.year, tagetTime.month, tagetTime.day, tagetTime.hours, tagetTime.minutes);

        const timerInterval = setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const currentDate = new Date();
            const difference = targetDate - currentDate;

            if (difference <= 0) {
                // Countdown reached zero or went negative
                clearInterval(timerInterval);
                return;
            }

            const daysToTarget = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hoursToTarget = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesToTarget = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const secondsToTarget = Math.floor((difference % (1000 * 60)) / 1000);

            // console.log(daysToTarget, hoursToTarget, minutesToTarget, secondsToTarget)
            setCounter(() => `${daysToTarget}: ${hoursToTarget}: ${minutesToTarget}: ${secondsToTarget}`)
        }

        updateCountdown();
        return () => clearInterval(timerInterval);

    }, [tagetTime.year, tagetTime.day, tagetTime.month, tagetTime.minutes, tagetTime.hours])


    function formatTime(time) {
        if (time < 10) {
            return '0' + time;
        }

        return time;
    }

    const onFinish = (value) => {
        console.log("value", value)
        const year = dayjs(value.date).format('YYYY');
        const month = dayjs(value.date).format('MM');
        const day = dayjs(value.date).format('DD');
        const hours = dayjs(value.time).format("H")
        const minutes = dayjs(value.time).format("m")
        console.log('dusan', date, hours, minutes)
        setTargetTime({
            year, month, day, hours, minutes
        })
        setIsCounterVisible(true);
    }


    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };


    return (
        <div className='background'>
            <div className='cfbgposition'>
                <div className='cfbgFont'>
                    CFBG
                </div>
                <div className='loadingText' id='loadingText'>
                    <div className='iconholder'>
                        <div className='iconstyle' id="iconStyle">
                            <FaStar style={{ marginBottom: ".1rem", marginLeft: '.01rem' }} className='liveIcon' />
                        </div>
                    </div>
                    <div className='enterText'>
                        <input
                            type={inputValue === 'ENTER THE PASSWORD..' ? "text" : 'password'}
                            className='transparent-input'
                            value={inputValue}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress} />
                    </div>
                </div>
                <div id='countdown'>{isCounterVisible && counter && counter}</div>
                <div className='autorsText'>
                    <div>
                        CLOSE FRIENDS BG
                    </div>
                    <div>
                        WWW.CFBG.PW
                    </div>
                </div>
                <Modal title="Basic Modal" open={isModalOpen} onOk={() => {
                    form.submit();
                    setIsModalOpen(false)
                }} onCancel={() => {
                    setIsModalOpen(false)
                }} >
                    <Form form={form} layout='vertical' onFinish={onFinish}>
                        <Form.Item name={'date'} label="Unesi datum" >
                            <DatePicker disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item name={'time'} label="Unesi vreme">
                            <TimePicker format={'HH:mm'} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div >
    )
}

export { HomePage }