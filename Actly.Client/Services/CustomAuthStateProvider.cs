using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;

public class CustomAuthStateProvider : AuthenticationStateProvider
{

    private string _token;

    public async Task SetTokenAsync(string token)
    {
        _token = token;
        // Here you might want to save the token somewhere, e.g. in localStorage

        // Notify the UI that authentication state has changed
        NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
    }

    private ClaimsPrincipal _anonymous = new ClaimsPrincipal(new ClaimsIdentity());

    public override Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        // Later you’ll read JWT from localStorage or cookie here
        var identity = string.IsNullOrEmpty(_token)
            ? new ClaimsIdentity()
            : new ClaimsIdentity(ParseClaimsFromJwt(_token), "jwt");

        var user = new ClaimsPrincipal(identity);

        return Task.FromResult(new AuthenticationState(_anonymous));
    }

    private IEnumerable<Claim> ParseClaimsFromJwt(string jwt)
    {
        // Parse claims from the JWT token
        // (You can find many implementations online)
        throw new NotImplementedException();
    }

    public void MarkUserAsAuthenticated(string username)
    {
        var identity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }, "apiauth");
        var user = new ClaimsPrincipal(identity);

        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(user)));
    }

    public void MarkUserAsLoggedOut()
    {
        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(_anonymous)));
    }
}
