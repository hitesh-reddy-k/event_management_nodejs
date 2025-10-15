function sortEvents(events) {
  return events.sort((a, b) => {
    const dateCompare = new Date(a.dateTime) - new Date(b.dateTime);
    if (dateCompare !== 0) return dateCompare;
    return a.location.localeCompare(b.location);
  });
}

module.exports = { sortEvents };
