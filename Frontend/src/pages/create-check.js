import React from 'react';
import { useState } from 'react';
import '../css/create-check.css';

function CreateCheck () {
    const [tab, setTab] = useState("guestNum");
    const [guestCount, setGuestCount] = useState();
    return (
        <>
            {tab === "guestNum" && (
                <div class='outer-container'>
                    <p class="header">How Many Guests in the Party?</p>
                    <div class="flex-column">
                        <input
                        value={guestCount}
                        onChange={num => setGuestCount(num.target.value)}
                        type="number"
                        class="input-box"
                        />
                        <button
                        class="submit-button"
                        onClick={() => {
                            setTab("orderDivvying")
                        }}
                        >
                        next
                        </button>
                    </div>
                </div>
                
            )}
            {tab === "orderDivvying" && (
                <>
                    <div>Hello {guestCount}</div>
                </>
            )}
        </>
    )
}

export default CreateCheck;