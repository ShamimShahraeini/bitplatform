﻿using System.Reflection;
using Bit.Signalr;

namespace Bit.Core
{
    public static class AssemblyContainerExtensions
    {
        public static Assembly GetBitSignalRAssembly(this AssemblyContainer container)
        {
            return typeof(MessagesHub).GetTypeInfo().Assembly;
        }
    }
}
