export default class FilterUtility {
  filter(items, spec): any {
    return items.filter((item) => spec.isApplicable(item));
  }
}

export function MultiSpecs(...specs) {
  this.isApplicable = (item) => {
    return specs?.every((spec) => spec.isApplicable(item));
  };
}

export function BySeverity(severities) {
  this.isApplicable = (item) => {
    if (!severities || severities.length === 0) return true;
    return severities?.some(({ filterLabel }) => item.severity === filterLabel);
  };
}

export function ByTime(time) {
  this.isApplicable = (item) => {
    if (!time || time.length === 0) return true;
    return time?.some(({ value }) => item.time >= Date.now() - value)
  };
}
