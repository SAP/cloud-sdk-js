export class RestRequestConfig{
  public customHeaders: Record<string, string> = {};

  addCustomHeaders(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([key, value]) => {
      this.customHeaders[key.toLowerCase()] = value;
    });
  }
}
