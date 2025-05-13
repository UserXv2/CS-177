
function limit (num, max, min) {
  let newNum = Number(num);
  newNum = Math.min(max, Math.max(min, num));
  return newNum;
}
function colorLim (color) {
  return limit(color, 255, 0)
}
function flexibilityLim (flexibility) {
  return limit(flexibility, 10, 1)
}

class Event {
  constructor(recurring = false, extraConsiderations = [], categoriy = "None", day = 1, month = 1, r = 0, g = 0, b = 0, notes = "Empty", startTime = new Date(), endTime = new Date()) {
    this.color = [colorLim(r), colorLim(g), colorLim(b)]
    this.recurring = recurring
    this.category= category
    this.day = day
    this.month = month
    this.notes = notes
    this.extraConsiderations = extraConsiderations

    this.startTime = startTime
    this.endTime = endTime

    this.eventDetails = []
  }
  estimateTime() {
    //taken from jack

    var estimatedHours = this.endTime.getHour();
    if (this.endTime.getAM() == this.startTime.getAM()) {
      estimatedHours -= this.startTime.getHour();
    }
    else {
      estimatedHours += (12 - this.startTime.getHour());
    }
    var estimatedMinutes = this.endTime.getMinute() - this.startTime.getMinute();
    this.timeToComplete = estimatedMinutes + (60 * estimatedHours);
    return this.timeToComplete;
    // why do we need estimate time on an event?
  }
  addNotes(note) {
    this.notes.push(note)


  }
  addEventDetails(detail) {
    this.eventDetails.push(detail)

  }
  assignCategoryAndColor(r, g, b, category) {
    // do colorLim
    this.color = [colorLim(r), colorlim(g), colorLim(b)];
    this.categories = category

  }
  addTimeConsideration(consideration) {
    this.extraConsiderations.push(consideration)
  }
  setRecurrence(recurring) {
    this.recurring = recurring

  }

}

module.exports = Event;