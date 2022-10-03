declare global {
  namespace JSX {
    interface IntrinsicElements {
      "input-with-request": {
        propkey?: string;
        name: string;
        url: string;
      };
      "response-output": {
        name: string;
        "initial-template": string;
        "success-template": string;
        "error-template": string;
        "pending-template": string;
      };
      "custom-template": { name: string };
    }
  }

  namespace JSXTE {
    interface BaseHTMLTagProps {
      name?: string;
    }
  }
}

export {};
