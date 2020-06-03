const baseButtonStyle = {
  maxWidth: "6rem",
  minWidth: "6rem",
};

const levelUp = {
  displayText: "Level Up",
  value: "level-up",
  variant: "outlined",
  styles: baseButtonStyle,
};

const machine = {
  displayText: "Technical Machine",
  value: "machine",
  variant: "outlined",
  styles: baseButtonStyle,
};

const breeding = {
  displayText: "Breeding",
  value: "egg",
  variant: "outlined",
  styles: baseButtonStyle,
};

const tutor = {
  displayText: "Tutor",
  value: "tutor",
  variant: "outlined",
  styles: baseButtonStyle,
};

const learnMethodButtonData = [levelUp, machine, breeding, tutor];

export default learnMethodButtonData;
