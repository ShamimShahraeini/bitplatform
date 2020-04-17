﻿using Bit.Model;
using Bit.ViewModel.Contracts;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xamarin.Essentials;

namespace Bit.ViewModel
{
    public class BitViewModelBase : Bindable, INavigatedAware, IInitializeAsync, INavigationAware, IDestructible
    {
        public virtual CancellationTokenSource CancellationTokenSource { get; set; }

        public virtual CancellationToken CurrentCancellationToken { get; set; }

        public virtual IExceptionHandler ExceptionHandler { get; set; } = default!;

        public BitViewModelBase()
        {
            CancellationTokenSource = new CancellationTokenSource();
            CurrentCancellationToken = CancellationTokenSource.Token;
        }

        public async void Destroy()
        {
            try
            {
                try
                {
                    CancellationTokenSource.Cancel();
                }
                finally // make sure that OnDestroyAsync gets called.
                {
                    await OnDestroyAsync();
                    await Task.Yield();
                }
            }
            catch (Exception exp)
            {
                ExceptionHandler.OnExceptionReceived(exp);
            }
        }

        public virtual Task OnDestroyAsync()
        {
            return Task.CompletedTask;
        }

        public async void OnNavigatedFrom(INavigationParameters parameters)
        {
            try
            {
                await OnNavigatedFromAsync(parameters);
                await Task.Yield();
            }
            catch (Exception exp)
            {
                ExceptionHandler.OnExceptionReceived(exp);
            }
        }

        public virtual Task OnNavigatedFromAsync(INavigationParameters parameters)
        {
            return Task.CompletedTask;
        }

        protected virtual string GetViewModelName()
        {
#if DotNet || UWP || NETSTANDARD2_0
            return GetType().Name.Replace("ViewModel", string.Empty);
#else
            return GetType().Name.Replace("ViewModel", string.Empty, StringComparison.InvariantCultureIgnoreCase);
#endif
        }

        protected virtual bool ShouldLogNavParam(string navParamName)
        {
            return true;
        }

        public async void OnNavigatedTo(INavigationParameters parameters)
        {
            DateTimeOffset startDate = DateTimeOffset.Now;
            bool success = true;
            string? navUri = null;

            try
            {
                await Task.Yield();
                await OnNavigatedToAsync(parameters);
                await Task.Yield();

                try
                {
                    navUri = NavigationService.GetNavigationUriPath();
                }
                catch
                {
                    navUri = GetType().Name;
                }

                string lastNavState = $"Path: {navUri}; {(string.Join("; ", parameters.Where(parameter => ShouldLogNavParam(parameter.Key)).Select(parameter => $" {parameter.Key} : {parameter.Value ?? "NULL"}")))}";

                Preferences.Set("LastNavState", lastNavState);
            }
            catch (Exception exp)
            {
                success = false;
                ExceptionHandler.OnExceptionReceived(exp);
            }
            finally
            {
                if (parameters.TryGetNavigationMode(out Prism.Navigation.NavigationMode navigationMode) && navigationMode == Prism.Navigation.NavigationMode.New)
                {
                    string pageName = GetViewModelName();

                    Dictionary<string, string?> properties = new Dictionary<string, string?> { };

                    foreach (KeyValuePair<string, object> prp in parameters)
                    {
                        if (ShouldLogNavParam(prp.Key))
                            properties.Add(prp.Key, prp.Value?.ToString() ?? "NULL");
                    }

                    properties.Add("PageViewSucceeded", success.ToString(CultureInfo.InvariantCulture));
                    properties.Add("NavUri", navUri);

                    TimeSpan duration = DateTimeOffset.Now - startDate;

                    TelemetryServices.All().TrackPageView(pageName, duration, properties);
                }
            }
        }

        public virtual Task OnNavigatedToAsync(INavigationParameters parameters)
        {
            return Task.CompletedTask;
        }

        public async Task InitializeAsync(INavigationParameters parameters)
        {
            try
            {
                await Task.Yield();
                await OnInitializeAsync(parameters);
            }
            catch (Exception exp)
            {
                ExceptionHandler.OnExceptionReceived(exp);
            }
        }

        public virtual Task OnInitializeAsync(INavigationParameters parameters)
        {
            return Task.CompletedTask;
        }

        public virtual INavService NavigationService { get; set; } = default!;

        public virtual IEnumerable<ITelemetryService> TelemetryServices { get; set; } = default!;
    }
}
