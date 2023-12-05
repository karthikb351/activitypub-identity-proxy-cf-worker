const proxyMap: Record<string, string | undefined> = {
  'reroll.in': 'social.reroll.in',
  'karthikbalakrishnan.com': 'fedi.karthikbalakrishnan.com',
  'karthikb351.com': 'fedi.karthikb351.com',
};

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const newHostname = proxyMap[url.hostname];

    if (!newHostname) {
      return new Response(
        'Sorry, this hostname is invalid. Please check the proxyMap config on your worker.',
        {
          status: 404,
        }
      );
    }

    url.hostname = newHostname;
    return await fetch(url.toString(), request);
  },
};
