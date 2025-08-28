export function assertSameGym(docA, docB, message = 'Cross-tenant operation') {
   if (String(docA.gymId) !== String(docB.gymId)) {
      const err = new Error(message);
      err.status = 400;              // you can change to 403/409/422 if you prefer
      throw err;
   }
}
