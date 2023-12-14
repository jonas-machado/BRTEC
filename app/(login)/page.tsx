import Image from "next/image";
import LoginForm from "../../components/form/LoginForm";

export default async function LoginPage() {
  return (
    <>
      <Image
        src={`/images/bg1.gif`}
        alt="bg"
        fill
        className="-z-50 bg-no-repeat"
        blurDataURL={`/images/bg1.gif`}
      />
      <div
        className={`h-screen flex items-center justify-center bg-no-repeat bg-fixed bg-cover`}
        id="login"
      >
        <LoginForm />
      </div>
    </>
  );
}
