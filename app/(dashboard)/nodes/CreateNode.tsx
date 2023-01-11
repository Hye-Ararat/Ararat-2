"use client";

import { useState } from "react";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import Label from "../../../components/Label";
import List from "../../../components/List";
import Modal from "../../../components/Modal";
import Stepper from "../../../components/Stepper";
import TextInput from "../../../components/TextInput";
import Typography from "../../../components/Typography";

export default function CreateNode() {
    let steps = ["Prerequisites", "SSH Information", "Installation", "Configuration"]
    const [creatingNode, setCreatingNode] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    return (
        <>

            <Button onClick={() => setCreatingNode(true)} className="ml-auto mt-auto mb-auto">Create Node</Button>
            {creatingNode ?
                <Modal title="Create Node">
                    <Stepper steps={steps} currentStep={currentStep} />
                    {currentStep == 1 ?
                        <>
                            <Typography fontColor="gray-900" fontColorDark="white" fontWeight="semibold">Please make sure your node meets the following prerequisites</Typography>
                            <List fontColorDark="gray-300" items={["SSH Server Running", "Username/Password Authentication Enabled", "Ubuntu 20.04+", "A user in the sudoers file"]} />
                        </>
                        : ""}
                    {currentStep == 2 ?
                        <>
                            <Typography fontColor="gray-900" fontColorDark="white" fontWeight="semibold">SSH Connection</Typography>
                            <form className="flex gap-4 flex-col">
                                <div className="flex gap-4 mx-auto">
                                <Typography className="my-auto" fontColor="gray-900" fontColorDark="white" fontWeight="bold">ssh</Typography>
                                    <div>
                                        <TextInput id="username" type="text" placeholder="Username" required />
                                    </div>
                                    <Typography className="my-auto" fontColor="gray-900" fontColorDark="white" fontWeight="bold">@</Typography>
                                    <div>
                                        <TextInput  id="address" type="text" placeholder="Address" required />
                                    </div>
                                    <Typography className="my-auto" fontColor="gray-900" fontColorDark="white" fontWeight="bold">:</Typography>
                                    <div className="w-20">
                                        <TextInput id="port" type="number" placeholder="Port" required />
                                    </div>
                                    
                                </div>
                                <Divider />
                                <Typography fontColor="gray-900" fontColorDark="white" fontWeight="semibold">Authentication</Typography>
                                <div className="w-fit">
                                    <Label value="Password" />
                                        <TextInput  id="Password" type="password" placeholder="Password" required />
                                        </div>
                                
                                
                            </form>
                        </>
                        : ""}
                    <Divider />

                    <div className="flex">
                        {currentStep == 1 ?
                            <Button onClick={() => setCreatingNode(false)} color="red" className="ml-auto">Cancel</Button>
                            : <Button onClick={() => setCurrentStep(currentStep - 1)} color="red" className="ml-auto">Go Back</Button>}
                        {currentStep != steps.length ?
                            <Button onClick={() => {
                                setCurrentStep(currentStep + 1)
                            }}>Continue</Button>
                            : <Button onClick={() => {
                                setCreatingNode(false)
                            }}>Finish</Button>}
                    </div>

                </Modal>
                : ""}

        </>
    )
}