import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

import { Form } from "../form/Form";

export function ModalRegister() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  return (
    <div className="flex flex-col gap-2">
      <Button className="max-w-[10rem]" color="primary" onPress={onOpen}>
        Cadastrar usuário
      </Button>

      <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen} >
        <ModalContent>
          <>
            <ModalHeader className="flex self-center font-bold text-[34px] pt-10 text-gray-800 dark:text-gray-200">
              Cadastro de usuário
            </ModalHeader>
            <ModalBody>
              <Form />
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
