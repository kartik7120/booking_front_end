import React, { useEffect, useState } from "react"
import { QueryFunctionContext, useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from 'js-cookie'
import { Outlet } from "react-router"
import { baseURL } from "../../App"
import 'flowbite';

export interface NavbarProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Flow of login
 * If a user is logged in, show the profile icon
 * If a user is not logged in, show the login button
 * When the login button is clicked, redirect to the login popover card
 * When the user logs in, set the isLoggedIn state to true
 * If the user is logged in, show the profile icon with the user's name
 * If the user is not logged in, show the login button
 */

async function LoginUser(
  context: QueryFunctionContext<readonly unknown[]>
) {
  const [, email, password] = context.queryKey

  const res = await fetch(`${baseURL}/loginUser`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      email, password
    })
  })

  return res.json()
}

async function RequestOTP(
  context: QueryFunctionContext<readonly unknown[]>
) {
  const [, email] = context.queryKey;

  console.log("email id: " + email)

  const res = await fetch(`${baseURL}/generateOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    throw new Error("Failed to request OTP");
  }

  return res.json();
}

async function RegisterUser(
  context: QueryFunctionContext<readonly unknown[]>
) {
  const [, email, password] = context.queryKey

  const res = await fetch(`${baseURL}/registerUser`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      email, password, role: "user"
    }),
    credentials: "include"
  })

  return res.json()
}

async function ValidateOTP(
  context: QueryFunctionContext<readonly unknown[]>
) {
  const [, email, otp] = context.queryKey

  const res = await fetch(`${baseURL}/validateOTP`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      email, otp
    })
  })

  return res.json()
}

/**
 * When the register button is clicked, redirect to the register popover card
 * When the user registers, an OTP form will be shown
 * After the user enters the OTP, the user will be registered
 * If the user is registered, set the isLoggedIn state to true
 * If the user is not registered, show an error message
 */

export default function Navbar(props: NavbarProps) {

  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setIsOTPScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resgiterEmail, setResgiterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  type AuthStep = "login" | "register" | "otp";
  const [authStep, setAuthStep] = useState<AuthStep>("login");

  useEffect(() => {
    // Read the cookies to check if the user is logged in
    const loggedInCookie = Cookies.get("auth_token")
    if (loggedInCookie) {
      // Validate the token
      props.setIsLoggedIn(true);
    } else {
      props.setIsLoggedIn(false);
    }
  }, [
    props.isLoggedIn
  ]);


  const {
    mutate,
    isError: IsLoginUserError,
    error: LoginUserError,
  } = useMutation({
    mutationFn: LoginUser,
    onError: (error) => {
      setError(error.message)
      setOtp("")
      setEmail("")
      setPassword("")
      setIsOTPScreen(false)
    },
    onSuccess: (data) => {
      console.log('User successfully logged')
      console.log('cookie = ', document.cookie)
      const loginModal = document.getElementById('my_modal_3');
      if (loginModal instanceof HTMLDialogElement) {
        loginModal.close()
      }

      Cookies.set("auth_token", data.token, {
        sameSite: "Strict",
        secure: false,
        expires: 7,
        path: "/",    // makes cookie accessible across your app
      })

      props.setIsLoggedIn(true)
    }
  })

  const {
    mutate: requestOtpMutate,
    isError: isErrorRequestOTP,
    isPending: requestOTPIsPending,
    error: errorRequestOTP
  } = useMutation({
    mutationFn: RequestOTP,
  })

  const {
    mutate: registerUserMutate,
    // isPending: registerUserIsPending,
    isError: isErrorRegisterUser,
    error: errorRegistering
  } = useMutation({
    mutationFn: RegisterUser,
  })

  const {
    mutate: validateOtpMutate,
    isError: isErrorValidateOTP,
    isPending: validateOtpPending,
    error: errorOtpValidate
  } = useMutation({
    mutationFn: ValidateOTP,
  })

  const handleCloseModal = () => {

    const modal = document.getElementById("authentication-modal")

    if (modal instanceof HTMLDialogElement) {
      modal.close()
    }
  }

  useEffect(() => {
    const loginModal = document.getElementById('my_modal_3');
    if (loginModal instanceof HTMLDialogElement) {
      loginModal.addEventListener('close', () => {
        // Reset the form fields when the modal is closed
        setEmail("");
        setPassword("");
        setResgiterEmail("");
        setRegisterPassword("");
        setOtp("");
        setIsOTPScreen(false);
        setConfirmPassword("");
        setError("");
      });
    }
  }, []);

  const handleRequestOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const request = await fetch(`${baseURL}/checkIfUserExists/${resgiterEmail || email}`)

      const res = await request.json();

      if (res.exists) {
        if (email === "" && password === "") {
          setError("A user with this email already exists. Please log in or use a different email to register.")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setIsOTPScreen(false)
          setRegisterPassword("")
          setResgiterEmail("")
          return
        }
      } else {
        if (email !== "" && password !== "") {
          setError("No user associated with this email ID exists")
          setIsOTPScreen(false)
          setEmail("")
          setPassword("")
        }
      }
    } catch (error: any) {
      setError(error)
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setIsOTPScreen(false)
      setRegisterPassword("")
      setResgiterEmail("")
      return
    }

    if (registerPassword !== confirmPassword) {
      console.log("password: ", registerPassword)
      console.log("confirm password: ", confirmPassword)
      console.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    console.log('email in handleRequestOtp function: ' + resgiterEmail)

    setAuthStep("otp")
    if (email !== "" && password !== "") {
      requestOtpMutate(
        {
          signal: new AbortController().signal,
          queryKey: ["requestOTP", email] as readonly unknown[],
          client: queryClient,
          meta: {}
        },
        {
          onSuccess: (data) => {
            console.log("OTP sent successfully", data);
            setIsOTPScreen(true); // Show OTP screen
          },
          onError: (error) => {
            console.log("error in handleRequestOtp function: " + error)
            console.error("Failed to send OTP", error);
            setError("Failed to send OTP");
          }
        }
      );
    } else {
      requestOtpMutate(
        {
          signal: new AbortController().signal,
          queryKey: ["requestOTP", resgiterEmail] as readonly unknown[],
          client: queryClient,
          meta: {}
        },
        {
          onSuccess: (data) => {
            console.log("OTP sent successfully", data);
            setIsOTPScreen(true); // Show OTP screen
          },
          onError: (error) => {
            console.log("error in handleRequestOtp function: " + error)
            console.error("Failed to send OTP", error);
            setError("Failed to send OTP");
          }
        }
      );
    }
  }

  const handleSubmitOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    const el = resgiterEmail ? resgiterEmail : email
    const pass = registerPassword ? registerPassword : password
    validateOtpMutate(
      {
        signal: new AbortController().signal,
        queryKey: ["validateOTP", el, otp] as readonly unknown[],
        client: queryClient,
        meta: {}
      },
      {
        onSuccess: (data) => {
          console.log("OTP validated successfully", data);
          // After successful OTP validation, you can set the isLoggedIn state to true
          if (data.message === "OTP validated successfully") {
            if (resgiterEmail && registerPassword) {
              console.log('registering new user')
              registerUserMutate(
                {
                  signal: new AbortController().signal,
                  queryKey: ["registerUser", el, pass] as readonly unknown[],
                  client: queryClient,
                  meta: {}
                },
                {
                  onSuccess: (data) => {
                    console.log("Registration successful", data);
                    // setIsOTPScreen(false); // Hide OTP screen
                    queryClient.invalidateQueries({
                      queryKey: ["getUser"]
                    })

                    props.setIsLoggedIn(true)

                    handleCloseModal()
                  },
                  onError: (error) => {
                    console.error("Registration failed", error);
                    setError("Registration failed");
                  }
                }
              );
            } else if (email && password) {
              mutate(
                {
                  signal: new AbortController().signal,
                  queryKey: ["login", email, password] as readonly unknown[],
                  client: queryClient,
                  meta: {}
                },
                {
                  onSuccess: (data) => {
                    console.log("Login successful", data);
                    queryClient.invalidateQueries(); // Invalidate queries to refresh data
                  },
                  onError: (error) => {
                    console.error("Login failed", error);
                    setError("Login failed");
                  }
                }
              );
            }
          }
          setIsOTPScreen(false); // Hide OTP screen
        },
        onError: (error) => {
          console.error("Failed to validate OTP", error);
          setError("Failed to validate OTP");
        }
      }
    );
  }

  const logout = (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault()

    Cookies.remove("auth_token");

    props.setIsLoggedIn(false);
  }


  return (
    <>
      <div>
        <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default dark">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
              <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Cinemagic</span>
            </a>
            <div className="inline-flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {props.isLoggedIn == false && <button type="button" className="text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none cursor-pointer text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal">
                Login / Register
              </button>}
              {
                props.isLoggedIn && <button type="button" onClick={logout} className="text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Logout</button>
              }
              <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-cta" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
              </button>
            </div>
            <div className="items-center justify-end hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                <li>
                  <a href="#" className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Movies</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Services</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {/* Flow bite tailwind modal register modal */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden dark overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
              <h3 className="text-lg font-medium text-heading">
                {authStep === "login" && "Login"}
                {authStep === "register" && "Create Account"}
                {authStep === "otp" && "Verify OTP"}
              </h3>

              <button onClick={() => {
                setAuthStep("login");
                setIsOTPScreen(false);
                setError("");
              }} type="button" className="text-body bg-transparent cursor-pointer hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* ================= LOGIN ================= */}
            {authStep === "login" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRequestOtp(e);
                }}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                  <input
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="example@company.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="my-6">
                  <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                  <input
                    type="password"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="text-white cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3">
                  Request OTP
                </button>

                <p className="text-sm text-text-muted text-center">
                  Not registered?{" "}
                  <button
                    type="button"
                    className="text-brand hover:underline"
                    onClick={() => setAuthStep("register")}
                  >
                    Create account
                  </button>
                </p>
              </form>
            )}

            {/* ================= REGISTER ================= */}
            {authStep === "register" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRequestOtp(e);
                }}
                className="pt-4 md:pt-6"
              >
                <div className="mb-4">
                  <label htmlFor="registeremail" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                  <input
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="example@company.com"
                    id="registeremail"
                    value={resgiterEmail}
                    onChange={(e) => setResgiterEmail(e.target.value)}
                  />
                </div>
                <div className="my-6">
                  <label htmlFor="registerpassword" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                  <input
                    type="password"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="•••••••••"
                    id="registerpassword"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
                <div className="my-6">
                  <label htmlFor="confirmregisterpassword" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                  <input
                    type="password"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="Confirm Password"
                    id="confirmregisterpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="text-white cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3">
                  {requestOTPIsPending ? "Sending OTP..." : "Request OTP"}
                </button>

                <p className="text-sm text-text-muted text-center mt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-brand hover:underline"
                    onClick={() => setAuthStep("login")}
                  >
                    Login
                  </button>
                </p>
              </form>
            )}

            {/* ================= OTP ================= */}
            {authStep === "otp" && (
              <form
                onSubmit={handleSubmitOtp}
                className="space-y-4"
              >
                <p className="text-sm text-text-muted">
                  Enter the OTP sent to your email
                </p>

                <input
                  className="w-full p-2 rounded-lg bg-surface-soft border border-border text-text-heading"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button type="submit" className="w-full bg-brand hover:bg-brand-strong text-white py-2 rounded-lg">
                  {validateOtpPending ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            {/* ================= ERRORS ================= */}
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                {error}
              </div>
            )}
            {
              IsLoginUserError && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                  {LoginUserError.message}
                </div>
              )
            }
            {
              isErrorRequestOTP && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                  {errorRequestOTP.message}
                </div>
              )
            }
            {
              isErrorRegisterUser && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                  {errorRegistering.message}
                </div>
              )
            }
            {
              isErrorValidateOTP && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                  {errorOtpValidate.message}
                </div>
              )
            }
          </div>
        </div>
      </div>
      {/* Render Outlet */}
      <Outlet />
    </>
  )
}
