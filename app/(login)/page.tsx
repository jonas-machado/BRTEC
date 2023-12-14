import Image from "next/image";
import LoginForm from "../../components/form/LoginForm";

export default async function LoginPage() {
  return (
    <>
      <div
        className={`h-screen bg-[url('/images/bg1.gif')] flex items-center justify-center bg-no-repeat bg-fixed bg-cover`}
        id="login"
      >
        <LoginForm />
      </div>
    </>
  );
}
