class SimpleIdGenerator {
  private lastTimestamp = 0;
  private sequence = 0;

  nextId(): string {
    const timestamp = Date.now();

    if (timestamp === this.lastTimestamp) {
      this.sequence++;
    } else {
      this.sequence = 0;
      this.lastTimestamp = timestamp;
    }

    // sequence কে 3 digit করে রাখছি
    const seq = String(this.sequence).padStart(3, "0");

    return `${timestamp}${seq}`;
  }
}

export const idGenerator = new SimpleIdGenerator();
