import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignInJoiSchema } from "../../validations/SigninSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";

function SignIn() {
  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignInJoiSchema),
  });

  const submit = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );
      console.log(token);
      toast.success("Sign In Successful");
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed");
    }
  };

  return (
    <form
      className="m-auto mt-20 flex w-2/5 flex-col gap-4 rounded-lg p-4 shadow-lg"
      onSubmit={handleSubmit(submit)}
    >
      <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
      <FloatingLabel
        type="email"
        variant="outlined"
        label="Email"
        {...register("email")}
        color={errors["email"] ? "error" : "success"}
      />
      <span className="text-sm text-red-500">{errors["email"]?.message}</span>

      <FloatingLabel
        type="password"
        variant="outlined"
        label="Password"
        {...register("password")}
        color={errors["password"] ? "error" : "success"}
      />
      <span className="text-sm text-red-500">
        {errors["password"]?.message}
      </span>

      <Button type="submit" disabled={!isValid}>
        Sign In
      </Button>
    </form>
  );
}

export default SignIn;
