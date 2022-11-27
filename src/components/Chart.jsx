import { Line } from "react-chartjs-2";

function Chart({ data }) {
  return (
    <Line
      data={data}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Sales since e-commerce deployment",
          },
        },
      }}
    />
  );
}

export default Chart;
