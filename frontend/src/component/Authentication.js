import { useFormik } from "formik";
import * as yup from "yup";
const Authentication = () => {
  const formik = useFormik({
    initialValues: {
      firstname: " ",
      lastname: "",
      email: "",
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        .trim()
        .required("firstname không được bỏ trống")
        .max(5, "tối đa 5 ký tự")
        .min(2, "ít nhất 2 ký tự"),
      lastname: yup
        .string()
        .trim()
        .required("last name không được bỏ trống")
        .max(6, "tối đa 6 ký tự")
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
    <div className="container">
      <div className="col-md-12 mt-5">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="mb-3">Personal information</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                className={
                  formik.touched.firstname
                    ? formik.errors.firstname
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                id="firstname"
                name="firstname"
                {...formik.getFieldProps("firstname")}
              />
              {formik.touched.firstname ? (
                formik.errors.firstname ? (
                  <p className="text-danger">{formik.errors.firstname}</p>
                ) : (
                  <p className="text-success">firstname có thể sử dụng</p>
                )
              ) : null}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                className={
                  formik.touched.lastname
                    ? formik.errors.lastname
                      ? "form-control is-invalid"
                      : "form-control is-valid"
                    : "form-control"
                }
                id="lastname"
                name="lastname"
                {...formik.getFieldProps("lastname")}
              />
              {formik.touched.lastname ? (
                formik.errors.lastname ? (
                  <p className="text-danger">{formik.errors.lastname}</p>
                ) : (
                  <p className="text-success">lastname có thể sử dụng</p>
                )
              ) : null}
            </div>
          </div>
          <div className="mb-3">
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
