import SubnetCard from "./components/SubnetCard/SubnetCard";

export default function SubnetCardList({ subnets, removeSubnet }) {
    return (
        <div>
            {subnets.map((subnet, index) => (
                <SubnetCard
                    key={index}
                    subnet={subnet}
                    removeSubnet={() => removeSubnet(index)}
                />
            ))}
        </div>
    );
}
