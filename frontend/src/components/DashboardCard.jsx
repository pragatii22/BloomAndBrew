const DashboardCard = ({ title, value, color }) => {

return(

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-gray-500">

{title}

</h2>

<h1
className={`text-5xl font-bold mt-4 ${color}`}
>

{value}

</h1>

</div>

);

};

export default DashboardCard;