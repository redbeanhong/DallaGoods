export default function(time) {
  let NewTime = new Date(time*1000);
  let NewDate=`${NewTime.getFullYear()}/${NewTime.getMonth()+1}/${NewTime.getDate()}`;
  return NewDate;
}
