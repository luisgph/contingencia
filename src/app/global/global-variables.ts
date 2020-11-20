import { HttpHeaders } from "@angular/common/http";

export const httpOptionsSoporte = {
    headers: new HttpHeaders({
      'Clientid': 'fece25a7-5d90-4b00-96cd-10f1a78f7975',
      'Secretkey': '42479b6f-9127-4e4c-ad11-b74b05db5439'
    })
};

export const httpOptionsReplicacion = {
  headers: new HttpHeaders({
    'Clientid': '76fbb33b-a2ab-4967-a072-c29828f114f6',
    'Secretkey': 'df3b8844-8744-4b9e-8eb6-68869f2890f2'
  })
};
