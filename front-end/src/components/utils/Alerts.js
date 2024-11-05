import { useState } from 'react';

function Alerts() {
    const [alertMessage, setAlertMessage] = useState(null);

    function alertAddItemCart(infos) {
        setAlertMessage(
            <div className="alert alert-success" role="alert">
                {infos || "A simple success alert—check it out!"}
            </div>
        );
    }

    function alertRemoveItemCart(infos) {
        setAlertMessage(
            <div className="alert alert-danger" role="alert">
                {infos || "An item was removed from the cart!"}
            </div>
        );
    }

    return (
        <div>
            {alertMessage}
            <button onClick={() => alertAddItemCart("Item added successfully!")}>Add Item Alert</button>
            <button onClick={() => alertRemoveItemCart("Item removed successfully!")}>Remove Item Alert</button>
        </div>
    );
}

export default Alerts;
