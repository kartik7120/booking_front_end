import { FiSearch } from "react-icons/fi"
import CinemagicIcon from "./CinemagicIcon"
import { CiMenuBurger } from "react-icons/ci"
import React, { ReactEventHandler, useEffect, useState } from "react"
import { QueryFunctionContext, useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from 'js-cookie'

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

  const res = await fetch("http://localhost:8080/loginUser", {
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

  const res = await fetch("http://localhost:8080/generateOTP", {
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

  const res = await fetch("http://localhost:8080/registerUser", {
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

  const res = await fetch("http://localhost:8080/validateOTP", {
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

async function ValidateToken(
  context: QueryFunctionContext<readonly unknown[]>
) {
  const [, token] = context.queryKey

  const res = await fetch("http://localhost:8080/validateToken", {
    headers: {
      "Context-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    method: "GET"
  })

  if (!res.ok) {
    throw new Error("Token validation failed")
  }

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
  const [isOTPScreen, setIsOTPScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resgiterEmail, setResgiterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const {
    mutate,
    isError: IsLoginUserError,
    error: LoginUserError,
    isPending: IsLoginUserPending
  } = useMutation({
    mutationFn: LoginUser,
    onError: (error, variables, context) => {
      setError(error.message)
      setOtp("")
      setEmail("")
      setPassword("")
      setIsOTPScreen(false)
    },
    onSuccess: (data, variables, context) => {
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
  } = useMutation({
    mutationFn: RequestOTP,
  })

  const {
    mutate: registerUserMutate,
    isPending: registerUserIsPending,
    isError: isErrorRegisterUser,
  } = useMutation({
    mutationFn: RegisterUser,
  })

  const {
    mutate: validateOtpMutate,
    isError: isErrorValidateOTP,
  } = useMutation({
    mutationFn: ValidateOTP,
  })

  const handleLoginClick = () => {
    // Handle login click
    const loginModal = document.getElementById('my_modal_3');
    if (loginModal instanceof HTMLDialogElement) {
      loginModal.showModal();
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    // For example, you can call an API to log in the user
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;
    const confirmPassword = (event.target as HTMLFormElement).confirmPassword?.value;

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

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
        }
      }
    );
    console.log("Form submitted");
    // After successful login, you can set the isLoggedIn state to true
  }

  const handleRequestOtp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const request = await fetch(`http://localhost:8080/checkIfUserExists/${resgiterEmail || email}`)

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

                    const loginModal = document.getElementById('my_modal_3');
                    if (loginModal instanceof HTMLDialogElement) {
                      if (loginModal?.open) {
                        loginModal.close()
                      }
                    }
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

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;
    const confirmPassword = (event.target as HTMLFormElement).confirmPassword?.value;

    if (registerPassword !== "" && confirmPassword !== "" && registerPassword !== confirmPassword) {
      console.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    registerUserMutate(
      {
        signal: new AbortController().signal,
        queryKey: ["registerUser", email, password] as readonly unknown[],
        client: queryClient,
        meta: {}
      },
      {
        onSuccess: (data) => {
          console.log("Registration successful", data);
          // After successful registration, you can set the isLoggedIn state to true
          setIsOTPScreen(false); // Hide OTP screen
        },
        onError: (error) => {
          console.error("Registration failed", error);
          setError("Registration failed");
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
    <div className="flex items-center justify-between m-7">
      {/* Logo */}
      <CinemagicIcon />

      {/* Desktop nav items */}
      <div className="flex flex-row justify-between gap-4 max-sm:hidden">
        <button className="btn btn-ghost"><FiSearch /></button>
        <button className="btn btn-ghost">Movies</button>
        <button className="btn btn-ghost">TV Shows</button>
        {
          props.isLoggedIn ? (
            <div className="dropdown dropdown-left">
              <div tabIndex={0} role="button" className="btn m-1 rounded-full">
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-full rounded-full">
                    P
                  </div>

                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><button className="btn btn-soft">Profile</button></li>
                <li><button className="btn btn-soft">My Bookings</button></li>
                <li><button className="btn btn-soft btn-error" onClick={logout}>Log out</button></li>
              </ul>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleLoginClick}>Login / Signup</button>
          )
        }
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/* {
            isErrorRequestOTP && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-red-500">Error sending OTP</p>
              <p className="text-gray-500">Please try again later. {error}</p>
            </div>
          }
          {
            isErrorRegisterUser && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-red-500">Error registering user</p>
              <p className="text-gray-500">Please try again later.</p>
            </div>
          }
          {
            isErrorValidateOTP && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-red-500">Error validating OTP</p>
              <p className="text-gray-500">Please try again later.</p>
            </div>
          } */}
          {
            // OTP screen logic
            isOTPScreen ? (registerUserIsPending ? (
              <div className="flex flex-col items-center gap-y-2">
                <span className="loading loading-spinner loading-xl"></span>
                <p className="text-xl">
                  Registering you
                </p>
              </div>
            ) :
              (
                <div>
                  <h3 className="font-bold text-lg">Enter OTP</h3>
                  <p className="py-4">An OTP has been sent to your email. Please enter it below.</p>
                  <div className="form-control w-full max-w-xs">
                    {/* <label className="label">
                    <span className="label-text">OTP</span>
                  </label> */}
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="input input-bordered w-full max-w-xs"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary" onClick={
                      handleSubmitOtp
                    } disabled={!otp.trim().length && otp.length === 6}>Verify OTP</button>
                  </div>
                </div>
              )
            ) : null
          }
          {/* name of each tab group should be unique */}
          {
            !isOTPScreen && <div className="tabs tabs-box">
              <input type="radio" name="my_tabs_6" className="tab" aria-label="Login" />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <form onSubmit={
                  handleRequestOtp
                }>
                  <h3 className="font-bold text-lg">Login</h3>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full max-w-xs"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full max-w-xs"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </form>
              </div>

              <input type="radio" name="my_tabs_6" className="tab" aria-label="Register" defaultChecked />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <form onSubmit={
                  handleRequestOtp
                }>
                  <h3 className="font-bold text-lg">Register</h3>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full max-w-xs"
                      value={resgiterEmail}
                      onChange={(e) => setResgiterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full max-w-xs"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      className="input input-bordered w-full max-w-xs"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </form>
              </div>
            </div>
          }
        </div>
        {
          error && <div className="text-red-500 mt-4">{error}</div>
        }
      </dialog>

      {/* Sidebar toggle button - visible on small screens only */}
      <div className="sm:hidden">
        <div className="drawer drawer-end sm:hidden">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
              <CiMenuBurger size={30} />
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

            {/* Sidebar */}
            <div className="relative w-80 min-h-full bg-base-200 p-4">
              {/* Close Button */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-sm btn-circle absolute right-4 top-4"
              >
                ✕
              </label>
              <ul className="menu mt-12 text-base-content">
                <li><a>Movies</a></li>
                <li><a>TV Shows</a></li>
                {props.isLoggedIn ? (
                  <li><a>Profile</a></li>
                ) : (
                  <li><a>Login / Signup</a></li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
