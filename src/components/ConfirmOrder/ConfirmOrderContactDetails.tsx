import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react"
import z from "zod"
import useStore from "../../zustand/store";
import { baseURL } from "../../App";

export interface Customer {
    customer_name?: string;
    phone_number?: string;
    email?: string;
    country?: string;
    state?: string;
    city?: string;
    zipcode?: number;
    street?: string;
    idempotent_key?: string;
}

export interface CustomerCreationResponse {
    message: string;
    customer_id: string; // or number, depending on the type of CustomerId
}

export async function CreatePaymentLink(idempotencyKey: string): Promise<{ Error: string, Status: string, payment_link: string, Message: string } | { error: string }> {

    const response = await fetch(`${baseURL}/createPaymentLink`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idempotent_key: idempotencyKey
        })
    })

    return response.json()
}

export async function create_customer(customer: Customer): Promise<CustomerCreationResponse> {

    const response = await fetch(`${baseURL}/createCustomer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...customer
        })
    })

    return response.json()
}

export default function ConfirmOrderContactDetails() {

    const [emailID, setEmailID] = useState<string>("")
    const [phoneNumber, setphoneNumber] = useState<string | number>("")
    const [error, setError] = useState("")
    const [selectCountryCode, setSelectCountryCode] = useState("")
    const [selectState, setSelectState] = useState("")
    const [selectCity, setSelectCity] = useState("")
    const [selectAddress, setSelectAddress] = useState("")
    const [selectZipcode, setSelectZipcode] = useState<number | string>("")
    const [customerName, setCustomerName] = useState("")

    const idempotentKey = useStore((state) => state.idempotencyKey)
    const setCustomerID = useStore((state) => state.setCustomersID)
    const customerID = useStore((state) => state.customersID)

    const { mutate: createPaymentLinkMutation, isPending: isPaymentPending } = useMutation({
        mutationKey: ["createPaymentLink", customerID, emailID, phoneNumber, idempotentKey],
        mutationFn: () => CreatePaymentLink(idempotentKey!),
        onSuccess: (data) => {
            // Redirect to payment link

            if (data && (data as any).error) {
                setError((data as any).error)
                return
            }

            if (data && "error" in data) {
                setError(data.error)
                return
            }

            console.log(`Payment link response data: ${data}`)

            if (data && data.payment_link) {

                console.log(`Navigating to payment link: ${data.payment_link}`)
                window.location.href = data.payment_link
                return
            } else {
                setError("Failed to get payment link. Please try again.")
            }
        },
        onError: (error) => {
            console.error("Error creating payment link:", error)
            setError("Error creating payment link. Please try again.")
        },
        retry: 3,
        retryDelay: 1000,
    })

    const { mutate, isError, error: customerMutateError, isPending: isCustomerPending } = useMutation({
        mutationFn: () => create_customer({
            email: emailID, phone_number: selectCountryCode + phoneNumber.toString(), country: selectCountryCode, idempotent_key: idempotentKey, state: selectState, city: selectCity, street: selectAddress, zipcode: Number(selectZipcode), customer_name: customerName
        }),
        onSuccess: (data) => {
            console.log(`Customer creation response data: ${data}`)

            if (data && data.customer_id) {
                setCustomerID(data.customer_id)
                // After creating customer, create payment link
                createPaymentLinkMutation()
            } else {
                setError("Failed to create customer. Please try again.")
            }
        },
        onError: (error) => {
            console.error("Error creating customer:", error)
            setError("Error creating customer. Please try again.")
        }
    })

    async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
        try {
            e.preventDefault()

            if (emailID === "" || phoneNumber === "") {
                setError("Email id and phone number cannot be empty")
                return
            }

            const UserInfo = z.object({
                emailID: z.email(),
                phoneNumber: z.string().max(10),
                countryCode: z.string().max(3),
                customerName: z.string(),
                address: z.string(),
                city: z.string(),
                state: z.string(),
                zipcode: z.number()
            });

            let contactDetails = UserInfo.parse({
                emailID,
                phoneNumber,
                countryCode: selectCountryCode,
                customerName,
                address: selectAddress,
                city: selectCity,
                state: selectState,
                zipcode: Number(selectZipcode)
            })

            // Call the backend endpoint to confirm booking / create order and navigate to payment page

            // Here after gibing email id and phone number, user's will be navigated to payment gateway page
            // where they will be able to see the order summary and make payment,


            console.log(`Contact details after submitting form: ${contactDetails}`)

            // Call the mutation to create customer
            mutate()

        } catch (error) {
            if (error instanceof z.ZodError) {
                let errorString = error.issues.map((issue) => issue.message).join(", ")
                setError(errorString)
                return
            }
        }
    }

    const isLoading = isCustomerPending || isPaymentPending

    return (
        <div className="border-2 rounded-xl p-10 w-full flex flex-col gap-y-3">
            <form className="flex flex-col gap-y-3 justify-center">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your email ID</legend>
                    <input required={true} type="email" className="input w-full" placeholder="Enter your email ID" value={emailID} onChange={(val) => setEmailID(val.target.value)} />
                </fieldset>
                <fieldset className="fieldset flex flex-row items-center gap-x-4">
                    <select required={true} defaultChecked className="select" value={selectCountryCode} onChange={(e) => setSelectCountryCode(e.target.value)}
                    >
                        <option disabled={true} value="">Select Country code</option>
                        <option>+91</option>
                        <option>+1</option>
                        <option>+23</option>
                    </select>
                    <legend className="fieldset-legend text-xl">Enter your phone number</legend>
                    <input type="number" required={true} className="input w-full" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
                </fieldset>

                {/* Need to add fields for state, country , address street */}

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your full name</legend>
                    <input type="text" className="input w-full" placeholder="Enter your full name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your address</legend>
                    <input type="text" className="input w-full" placeholder="Enter your address" value={selectAddress} onChange={(e) => setSelectAddress(e.target.value)} />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your city</legend>
                    <input type="text" className="input w-full" placeholder="Enter your city" value={selectCity} onChange={(e) => setSelectCity(e.target.value)} />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your state</legend>
                    {/* Dropdown for states */}
                    <select defaultValue="Enter your state" defaultChecked required className="select" value={selectState} onChange={(e) => {
                        setSelectState(e.target.value)
                    }}>
                        <option disabled={true} value="">Enter your state</option>
                        <option>Maharashtra</option>
                        <option>Gujarat</option>
                        <option>Rajasthan</option>
                        <option>Punjab</option>
                        <option>Haryana</option>
                        <option>Uttar Pradesh</option>
                        <option>Bihar</option>
                        <option>West Bengal</option>
                        <option>Tamil Nadu</option>
                        <option>Kerala</option>
                        <option>Karnataka</option>
                        <option>Andhra Pradesh</option>
                        <option>Telangana</option>
                        <option>Odisha</option>
                        <option>Chhattisgarh</option>
                        <option>Jharkhand</option>
                        <option>Assam</option>
                        <option>Nagaland</option>
                        <option>Manipur</option>
                        <option>Mizoram</option>
                        <option>Tripura</option>
                        <option>Meghalaya</option>
                        <option>Sikkim</option>
                        <option>Arunachal Pradesh</option>
                        <option>Goa</option>
                        <option>Himachal Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>Jammu and Kashmir</option>
                        <option>Ladakh</option>
                        <option>Delhi</option>
                        <option>Puducherry</option>
                        <option>Chandigarh</option>
                        <option value="other">Other</option>
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your zipcode</legend>
                    <input type="number" className="input w-full" required placeholder="Enter your zipcode" value={selectZipcode} onChange={(e) => setSelectZipcode(e.target.value)} />
                </fieldset>
                <button
                    className="btn btn-error btn-outline"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Confirm booking"}
                </button>
            </form>
            {error && error.length && (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        {error}
                    </span>
                </div>
            )}
            {
                isError && (
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            {customerMutateError instanceof Error ? customerMutateError.message : "An unknown error occurred"}
                        </span>
                    </div>
                )
            }
        </div>
    )
}
