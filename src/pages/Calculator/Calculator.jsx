import CalculatorNavBar from "./components/CalculatorNavBar/CalculatorNavBar";
import NewSubnetCard from "./components/NewSubnetCard/NewSubnetCard";
import SubnetCardList from "./components/SubnetCardList/SubnetCardList";

import { useState } from "react";

export default function Calculator() {
    const [subnets, setSubnets] = useState([]);

    const addSubnet = (subnet) => {
        setSubnets([...subnets, subnet]);
    };

    const removeSubnet = (index) => {
        setSubnets(subnets.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-black">
            <div className="mt-6">
                <CalculatorNavBar subnets={subnets} setSubnets={setSubnets} />
            </div>
            <div className="p-8">
                <SubnetCardList subnets={subnets} removeSubnet={removeSubnet} />
                <NewSubnetCard addSubnet={addSubnet} subnets={subnets} />
            </div>
        </div>
    );
}
