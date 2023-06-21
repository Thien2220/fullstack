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
        .trim("das")
        .required("password không được bỏ trống")
        .max(100, "tối đa 100 ký tự")
        .min(4, "ít nhất 4 ký tự"),
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
    formik.errors.email === undefined &&
      fetcher.submit(
        { data: JSON.stringify(nOb) },
        { method: "PUT", action: "/" }
      );
  };
  const loginHandler = () => {
    const nOb = { ...formik.values };
    nOb.status = "login";
    formik.errors.email === undefined &&
      fetcher.submit(
        { data: JSON.stringify(nOb) },
        { method: "put", action: "/" }
      );
  };
  const clickEmailHandler = () => {
    fetcher.submit({ data: "click" }, { method: "post", action: "/" });
  };
  return (
    <>
      <div className="m-4 p-5  "> </div>
      <div className="container m-auto p-5  ">
        <div className="  m-auto  out text-center p-5 w-50 bg-dark text-white ">
          <fetcher.Form onSubmit={formik.handleSubmit}>
            <h2 className="mb-3">Sigup & Login </h2>
            <div className=" ">
              {/* email */}
              <div className="mb-3   ">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  onClick={clickEmailHandler}
                  type="email"
                  className={
                    (fetcher.data !== undefined && fetcher.data) === "click"
                      ? "form-control"
                      : formik.touched.email
                      ? !formik.errors.email &&
                        ((fetcher.data !== undefined && fetcher.data.status) ===
                          "success" ||
                          (fetcher.data !== undefined &&
                            fetcher.data.status) === "đăng nhập thành công")
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                  }
                  {...formik.getFieldProps("email")}
                  placeholder="you@example.com"
                />
                <p
                  className={
                    formik.errors.email === undefined &&
                    fetcher.data !== undefined &&
                    fetcher.data.status
                      ? (fetcher.data !== undefined && fetcher.data.status) ===
                          "success" ||
                        (fetcher.data !== undefined && fetcher.data.status) ===
                          "đăng nhập thành công"
                        ? "text-success"
                        : "text-danger"
                      : null
                  }
                >
                  {formik.errors.email === undefined &&
                  fetcher.data !== undefined &&
                  fetcher.data.status
                    ? fetcher.data !== undefined && fetcher.data.status
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
                  pattern="[A-Za ]+"
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
    </>
  );
};

export default Authentication;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = await formData.get("data");
  if (data === "click") {
    return "click";
  } else {
    const status = JSON.parse(formData.get("data")).status;
    // console.log(status);
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
    } else {
      token = "";
    }
    try {
      const response = await fetch(`http://localhost:3002/${status}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: data,
      });
      const result = await response.json();
      console.log(result);
      result.token && localStorage.setItem("token", result.token);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
