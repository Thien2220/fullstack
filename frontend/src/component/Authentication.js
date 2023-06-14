import { useFormik } from "formik";
import * as yup from "yup";
const Authentication = () => {
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
    onSubmit: (val) => console.log(val),
  });
  return (
    <div className="container m-auto p-5 ">
      <div className="  m-auto  out text-center p-5 w-50 bg-dark text-white ">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="mb-3">Personal information</h4>
          <div className=" ">
            {/* email */}
            <div className="mb-3  ">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={
                  formik.touched.email
                    ? formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                id="email"
                name="email"
                {...formik.getFieldProps("email")}
                placeholder="you@example.com"
              />
              {formik.touched.email ? (
                formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : (
                  <p className="text-success">email có thể sử dụng</p>
                )
              ) : null}
            </div>

            <div className="  mb-3">
              <label htmlFor="password">password</label>
              <input
                type="password"
                className={
                  formik.touched.password
                    ? formik.errors.password
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                id="password"
                name="password"
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
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Authentication;
