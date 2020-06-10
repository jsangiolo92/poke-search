import { returnArrowIcon, returnSaveIcon, returnChildIcon, returnSchoolIcon } from "./learn-method-icons";

const baseButtonStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const levelUp = {
  displayText: "Level Up",
  value: "level-up",
  variant: "outlined",
  styles: baseButtonStyle,
  icon: returnArrowIcon,
};

const machine = {
  displayText: "Technical Machine",
  value: "machine",
  variant: "outlined",
  styles: baseButtonStyle,
  icon: returnSaveIcon,
};

const breeding = {
  displayText: "Breeding",
  value: "egg",
  variant: "outlined",
  styles: baseButtonStyle,
  icon: returnChildIcon,
};

const tutor = {
  displayText: "Tutor",
  value: "tutor",
  variant: "outlined",
  styles: baseButtonStyle,
  icon: returnSchoolIcon,
};

const learnMethodButtonData = [levelUp, machine, breeding, tutor];

export default learnMethodButtonData;
