export default function(time) {
  let NewTime = new Date(time);
  let NewDate=`${NewTime.getFullYear()}/${NewTime.getMonth()}/${NewTime.getDate()}`;
  return NewDate;
}
