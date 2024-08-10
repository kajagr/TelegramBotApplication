import ticket1 from './tickets/1ticket.png'
import ticket2 from './tickets/4tickets.png'
import ticket3 from './tickets/16tickets.png'
import ticket4 from './tickets/64tickets.png'
import ticket5 from './tickets/256tickets.png'

export function getData() {
  return [
    { title: "1 ticket for 1$", price:1, Image:ticket1},
    { title: "4 tickets for 3$", price:3, Image:ticket2},
    { title: "16 tickets for 10$", price:10, Image:ticket3},
    { title: "64 tickets for 30$", price:30, Image:ticket4},
    { title: "256 tickets for 100$", price:100, Image:ticket5}
  ]
}