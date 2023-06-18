import { useFormik } from "formik";
import { useFetcher } from "react-router-dom";
import * as yup from "yup";

const Authentication = () => {
  const fetcher = useFetcher();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: " ",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .trim()
        .required("password không được bỏ trống")
        .max(100, "tối đa 100 ký tự")
        .min(2, "ít nhất 2 ký tự"),
      email: yup
        .string()
        .trim()
        .required("email không được bỏ trống")
        .email("email không hợp lệ"),
    }),
  });
  // arr save password invalid to check in email alert
  const sigupHandler = () => {
    const nOb = { ...formik.values };
    nOb.status = "sigup";
    console.log(nOb);
    formik.errors.email === undefined &&
      fetcher.submit(
        { data: JSON.stringify(nOb) },
        { method: "PUT", action: "/" }
      );
  };
  const loginHandler = () => {
    const nOb = { ...formik.values };
    nOb.status = "login";
    console.log(nOb);
    formik.errors.email === undefined &&
      fetcher.submit(
        { data: JSON.stringify(nOb) },
        { method: "put", action: "/" }
      );
  };

  return (
    <div className="container m-auto p-5 ">
      <div className="  m-auto  out text-center p-5 w-50 bg-dark text-white ">
        <fetcher.Form onSubmit={formik.handleSubmit}>
          <h4 className="mb-3">Personal information</h4>
          <div className=" ">
            {/* email */}
            <div className="mb-3  ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={
                  formik.touched.email
                    ? formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                {...formik.getFieldProps("email")}
                placeholder="you@example.com"
              />
              <p
                className={
                  formik.errors.email === undefined && fetcher.data
                    ? fetcher.data === "success" ||
                      fetcher.data === "login success"
                      ? "text-success"
                      : "text-danger"
                    : null
                }
              >
                {formik.errors.email === undefined && fetcher.data
                  ? fetcher.data
                  : null}
              </p>
              {formik.touched.email ? (
                formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : null
              ) : null}
            </div>

            <div className="  mb-3">
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                className={
                  formik.touched.password
                    ? formik.errors.password
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password ? (
                formik.errors.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : (
                  <p className="text-success">password có thể sử dụng</p>
                )
              ) : null}
            </div>
          </div>

          <hr className="mb-4" />
          <div className="row justify-content-between">
            <button
              className="btn col-4 btn-danger btn-lg btn-block"
              type="button"
              onClick={sigupHandler}
            >
              Sig Up
            </button>
            <button
              className="col-4 btn btn-danger btn-lg"
              type="button"
              onClick={loginHandler}
            >
              log In
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};
export default Authentication;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = await formData.get("data");
  console.log(data);
  const status = JSON.parse(formData.get("data")).status;
  console.log(status);
  try {
    const response = await fetch(`http://localhost:3002/${status}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const result = await response.json();
    if (status === "sigup") {
      return result.newuser;
    }
    if (status === "login") {
      console.log(result.loginUser);
      if (result.loginUser > 0) {
        return "login success";
      } else {
        return "sai tài khoản hoặc mật khẩu";
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
