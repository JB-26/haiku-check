export default function checkHaiku(haiku: number[]): boolean {
  try {
    console.log(haiku[0]);
    console.log(haiku[1]);
    console.log(haiku[2]);
    if (haiku[0] == 5 && haiku[1] == 7 && haiku[2] == 5) {
      console.log("Haiku is valid");
      return true;
    } else {
      console.log("Haiku is invalid");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
