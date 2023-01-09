"use client";

import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Stepper from "../../../components/Stepper";

export default function CreateNode() {
    const [creatingNode, setCreatingNode] = useState(false)
    return (
    <>
    
            <Button onClick={() => setCreatingNode(true)} className="ml-auto mt-auto mb-auto">Create Node</Button>
            {creatingNode ? 
            <Modal title="Create Node">
                <Stepper steps={[{name: "Test", complete: true}, {name: "test2", complete: false}]} />
            </Modal>
            : ""}

    </>
    )
}