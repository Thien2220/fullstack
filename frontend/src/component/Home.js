import { useLoaderData } from "react-router-dom";

const Home = () => {
  const plusHander = async () => {
    const respone = await fetch("http://localhost:3002/");
    const data = await respone.json();
    console.log(data);
  };
  const decsHander = async () => {
    console.log("decs push");
    try {
      const response = await fetch("http://localhost:3002/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x: "decs" }),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <button className="btn btn-danger" onClick={decsHander}>
          decs
        </button>
      </div>
      <div className="col">
        <button className="btn btn-danger" onClick={plusHander}>
          plus
        </button>
      </div>
    </div>
  );
};
export default Home;

export const homeLoader = () => {
  return { data: "thien" };
};
