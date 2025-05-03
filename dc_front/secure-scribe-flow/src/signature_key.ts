async function ensureSignatureKey() {
    if (!localStorage.getItem("signatureKey")) {
      const key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt"]
      );
      const raw = await crypto.subtle.exportKey("raw", key);
      const b64 = btoa(String.fromCharCode(...new Uint8Array(raw)));
      localStorage.setItem("signatureKey", b64);
    }
  }
  
  const key = localStorage.getItem("signatureKey");
  if (key) {
    const raw = Uint8Array.from(atob(key), c => c.charCodeAt(0));
    return crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, true, ["encrypt"]);
  } else {
    throw new Error("No signature key found in local storage.");
  }

  
    
    export default ensureSignatureKey;
  