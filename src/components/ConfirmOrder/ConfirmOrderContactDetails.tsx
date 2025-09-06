import { FormEvent, useState } from "react"
import z from "zod"

export default function ConfirmOrderContactDetails() {

    const [emailID, setEmailID] = useState<string>("")
    const [phoneNumber, setphoneNumber] = useState<string | number>("")
    const [error, setError] = useState("")
    const [selectCountryCode, setSelectCountryCode] = useState("")

    async function handleSubmit(e: FormEvent<HTMLButtonElement>) {
        try {
            e.preventDefault()

            if (emailID === "" || phoneNumber === "") {
                setError("Email id and phone number cannot be empty")
                return
            }

            const UserInfo = z.object({
                emailID: z.email(),
                phoneNumber: z.string().max(10)
            });

            let { emailID: email, phoneNumber: phone_number } = UserInfo.parse({
                emailID,
                phoneNumber
            })

            // Call the backend endpoint to confirm booking / create order and navigate to payment page

            console.log(`email id : ${email} and phone number: ${phone_number}`)

        } catch (error) {
            if (error instanceof z.ZodError) {
                let errorString = error.issues.map((issue) => issue.message).join(", ")
                setError(errorString)
                return
            }
        }
    }

    return (
        <div className="border-2 rounded-xl p-10 w-full flex flex-col gap-y-3">
            <form className="flex flex-col gap-y-3 justify-center">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xl">Enter your email ID</legend>
                    <input required={true} type="email" className="input w-full" placeholder="Enter your email ID" value={emailID} onChange={(val) => setEmailID(val.target.value)} />
                </fieldset>
                <fieldset className="fieldset flex flex-row items-center gap-x-4">
                    <select required={true} defaultValue="Select Country code" defaultChecked className="select" value={selectCountryCode} onChange={(e) => setSelectCountryCode(e.target.value)}
                    >
                        <option disabled={true}>Select Country code</option>
                        <option>91</option>
                        <option>1</option>
                        <option>23</option>
                    </select>
                    <legend className="fieldset-legend text-xl">Enter your phone number</legend>
                    <input type="number" required={true} className="input w-full" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} />
                </fieldset>
                <button className="btn btn-error btn-outline" type="submit" onClick={handleSubmit}>Confirm booking</button>
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
        </div>
    )
}
