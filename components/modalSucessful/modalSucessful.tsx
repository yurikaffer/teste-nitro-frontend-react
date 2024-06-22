import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface ModalSuccessfulProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export function ModalSuccessful({ setIsOpen, isOpen }: ModalSuccessfulProps) {
  return (
    <div className="flex flex-col gap-2">
      <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <>
            <ModalHeader className="self-center py-[4rem]">
              <span className="text-[80px]">🥳</span>
            </ModalHeader>
            <ModalBody className="flex self-center font-normal p-0 text-[20px] text-green-500 text-center">
              Usuário cadastrado com sucesso! 🎉
            </ModalBody>
            <ModalFooter />
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
