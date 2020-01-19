const now = new Date()

export default [
  {
    id: 0,
    title: 'NewPort Babecue',
    allDay: true,
    start: new Date(2020, 0, 15),
    end: new Date(2020, 0, 15),
  },
  {
    id: 14,
    title: 'Today event',
    start: new Date(new Date().setHours(new Date().getHours() - 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  }
]