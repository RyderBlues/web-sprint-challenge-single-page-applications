import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import * as yup from 'yup';
import schema from './FormSchema';
import styled from 'styled-components';

const initialFormValues = {
    name: '',
    size: '',
    tomatoSauce: false,
    whiteSauce: false,
    pepperoni: false,
    bellPeppers: false,
    instructions: ''
};

const initialFormErrors = {
    name: '',
    size: '',
    instructions: ''
};

const initialOrders = [];
const initialDisabled = true;

export default function PizzaForm() {

    const [orders, setOrders] = useState(initialOrders); // SLICES OF STATE
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    
    // HELPERS
    
    
    const inputChange = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => {
            setFormErrors({...formErrors, [name]: '',});
            })
            .catch(err => {
            setFormErrors({...formErrors, [name]: err.errors[0],
            });
            })
        
        setFormValues({...formValues, [name]: value});      // Changing formValues based on input
    };

    useEffect(() => {
        schema.isValid(formValues).then(valid => { //Setting up disabled submit button
          setDisabled(!valid);
        })
      }, [formValues]);

    const onChange = evt => {                               // Showing the changing input
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked: value;
        inputChange(name, valueToUse);
    }

    const postNewOrder = newOrder => {
        axios
            .post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                console.log(res);
                setOrders([res.data, ...orders]);
                setFormValues(initialFormValues);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const orderSubmit = () => {
        const newOrder = {
            name: formValues.name.trim(),
            size: formValues.size.trim(),
            tomatoSauce: formValues.tomatoSauce,
            whiteSauce: formValues.whiteSauce,
            pepperoni: formValues.pepperoni,
            bellPeppers: formValues.bellPeppers,
            instructions: formValues.instructions.trim(),
        }
        postNewOrder(newOrder);
    }

    const onSubmit = evt => {
        evt.preventDefault();
        orderSubmit();
    }

    // styles
    const OrderWrapper = styled.div`
        border: 2px solid black;
        font-size: 1rem;
        border-radius: 10px;
        width: 20%;
        line-height: 2;
        text-align: center;
    `
    //

    return (
      <div>
        <h1>Build Your Own Pizza!</h1>
        <div>
            <div>{formErrors.name}</div>
            <div>{formErrors.size}</div>
        </div>
        <form id='pizza-form' onSubmit={onSubmit}>
            <label>Order For:&nbsp;                                 {/*Name input */}
                <input id='name-input' name='name'
                       placeholder='Your Name Here..'
                       type='text'
                       onChange={onChange}
                       value={formValues.name}
                />
            </label><br/>
            <label>Choice of Size:                              {/* Dropdown */}
                <select
                    id='size-dropdown' 
                    name='size'
                    onChange={onChange}
                    value={formValues.size}
                >
                    <option value=''>--Select a Size--</option>
                    <option value='Small'>Small</option>
                    <option value='Medium'>Medium</option>
                    <option value='Large'>Large</option>
                    <option value='Family'>Family</option>
                </select>
            </label>
            <br/>
            <h2>Sauce and Toppings!</h2>                        {/*Checkboxes */}
            <label>Tomato Sauce
                <input type='checkbox'
                       name='tomatoSauce'
                       onChange={onChange}
                       checked={formValues.tomatoSauce}
                />
            </label>
            <label>White Sauce
                <input type='checkbox'
                       name='whiteSauce'
                       onChange={onChange}
                       checked={formValues.whiteSauce}
                />
            </label>
            <label>Pepperoni
                <input type='checkbox'
                       name='pepperoni'
                       onChange={onChange}
                       checked={formValues.pepperoni}
                />
            </label>
            <label>Bell Peppers
                <input type='checkbox'
                       name='bellPeppers'
                       onChange={onChange}
                       checked={formValues.bellPeppers}
                />
            </label>
            <label>Special Instructions:
                <input type='text'
                       name='instructions'
                       onChange={onChange}
                       value={formValues.instructions}
                       id='special-text'
                />
            </label>
            <br/><button id='order-button' disabled={disabled}>Add to Order!</button>
        </form>

        {orders.map((order, idx) => {
            if(!order) { return <h2>loading..</h2>}
            return (
                <OrderWrapper key={idx}>
                    <h2>{order.name}</h2>
                    <p>A {order.size} pizza with..</p>
                    <p>{order.tomatoSauce !== false ? 'Tomato Sauce': ''}</p>
                    <p>{order.whiteSauce !== false ? 'White Sauce': ''}</p>
                    <p>{order.pepperoni !== false ? 'Pepperoni': ''}</p>
                    <p>{order.bellPeppers !== false ? 'Bell Peppers': ''}</p>
                    <p>Special Instructions: {order.instructions}</p>
                </OrderWrapper>
            )
        })}
      </div>
        );
    }